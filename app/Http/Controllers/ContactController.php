<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // ✅ POST /api/contact — send contact message (public)
    public function send(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|min:5',
        ]);

        $contact = Contact::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
            'sent_at' => now(),
        ]);

        return response()->json([
            'message' => "Message sent successfully! We'll get back to you soon.",
        ], 201);
    }

    // ✅ GET /api/admin/contacts — admin reads all messages
    public function index()
    {
        $contacts = Contact::orderBy('sent_at', 'desc')->get();

        return response()->json([
            'contacts' => $contacts,
            'total' => $contacts->count(),
        ]);
    }

    // ✅ DELETE /api/admin/contacts/{id} — admin deletes a message
    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();

        return response()->json(['message' => 'Message deleted!']);
    }
}