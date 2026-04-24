<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class GoogleController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google.
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Find user by google_id or email
            $user = User::where('google_id', $googleUser->id)
                        ->orWhere('email', $googleUser->email)
                        ->first();

            if ($user) {
                // Update google_id if it's missing
                if (empty($user->google_id)) {
                    $user->update(['google_id' => $googleUser->id]);
                }
                
                Auth::login($user);
            } else {
                // Register new user
                $newUser = User::create([
                    'name'      => $googleUser->name,
                    'email'     => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password'  => bcrypt(\Illuminate\Support\Str::random(16)), // Required field
                ]);

                // Assign default role if Spatie Permissions is used
                if (method_exists($newUser, 'assignRole')) {
                    $newUser->assignRole('customer');
                }

                Auth::login($newUser);
            }

            return redirect()->intended('/dashboard');

        } catch (Exception $e) {
            return redirect('/login')->with('error', 'Something went wrong while logging in with Google.');
        }
    }
}
