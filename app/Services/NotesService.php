<?php

namespace App\Services;

use App\Contracts\NotesServiceInterface;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class NotesService implements NotesServiceInterface
{

    public function loadNotes(): Collection
    {
        return Note::with('tag')->where('user_id', Auth::id())->latest()->get();
    }

    public function createNote(string $tagId, string $text): void {
        Note::create([
            'user_id' => Auth::id(),
            'tag_id' => $tagId,
            'text' => $text,
        ]);
    }

    public function deleteNote(string $noteId): void {
        Note::where('id', $noteId)->where('user_id', Auth::id())->delete();
    }
}
