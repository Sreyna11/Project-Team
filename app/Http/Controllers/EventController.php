<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // ✅ GET /api/events — get all events (public)
    public function index()
    {
        $events = Event::orderBy('start_date', 'desc')->get();
        return response()->json(['events' => $events]);
    }

    // ✅ POST /api/admin/events — create event (admin only)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $event = Event::create($request->only([
            'name',
            'start_date',
            'end_date'
        ]));

        return response()->json([
            'message' => 'Event created!',
            'event' => $event,
        ], 201);
    }

    // ✅ PUT /api/admin/events/{id} — update event (admin only)
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:150',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);

        $event->update($request->only([
            'name',
            'start_date',
            'end_date'
        ]));

        return response()->json([
            'message' => 'Event updated!',
            'event' => $event,
        ]);
    }

    // ✅ DELETE /api/admin/events/{id} — delete event (admin only)
    public function destroy($id)
    {
        Event::findOrFail($id)->delete();
        return response()->json(['message' => 'Event deleted!']);
    }
}