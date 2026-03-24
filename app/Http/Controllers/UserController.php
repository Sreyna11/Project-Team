<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    // ✅ POST /api/register
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'photo' => 'nullable|string|max:500',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'photo' => $request->photo ?? null,
            'is_active' => true,
            'role' => 'user',
        ]);

        $token = $user->createToken('learnhub-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful!',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // ✅ POST /api/login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (!$user->is_active) {
            return response()->json(['message' => 'Your account is disabled.'], 403);
        }

        // Remove old tokens → single session
        $user->tokens()->delete();

        $token = $user->createToken('learnhub-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful!',
            'user' => $user,
            'token' => $token,
        ]);
    }

    // ✅ POST /api/logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    // ✅ GET /api/me
    public function me(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    // ✅ PUT /api/me
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:6|confirmed',
            'photo' => 'nullable|string|max:500',
        ]);

        if ($request->has('name'))
            $user->name = $request->name;
        if ($request->has('email'))
            $user->email = $request->email;
        if ($request->has('photo'))
            $user->photo = $request->photo;
        if ($request->has('password'))
            $user->password = Hash::make($request->password);

        $user->save();

        return response()->json(['message' => 'Profile updated!', 'user' => $user]);
    }

    // ✅ GET /api/admin/users (admin only)
    public function allUsers()
    {
        $users = User::withCount('payments')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['users' => $users]);
    }

    // ✅ DELETE /api/admin/users/{id} — delete user (admin only)
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Prevent admin from deleting themselves
        if ($user->id === request()->user()->id) {
            return response()->json([
                'message' => 'You cannot delete your own account!'
            ], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted!']);
    }
}