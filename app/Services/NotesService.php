<?php

namespace App\Services;

use App\Contracts\NotesServiceInterface;
use App\Models\Note;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class NotesService implements NotesServiceInterface
{

    public function loadNotes(): Collection
    {
        return Note::with('tag')->where('user_id', Auth::id())->latest()->get();
    }

    public function loadNotesApi(User $user): Collection
    {
        return Note::with('tag')->where('user_id', $user->id)->latest()->get();
    }

    public function createNote(string $tagId, string $text): void {
        Note::create([
            'user_id' => Auth::id(),
            'tag_id' => $tagId,
            'text' => $text,
        ]);
    }

    public function createNoteApi(User $user, string $tagId, string $text): Note
    {
        return Note::create([
            'user_id' => $user->id,
            'tag_id'  => $tagId,
            'text'    => $text,
        ]);
    }

    public function deleteNote(string $noteId): void {
        Note::where('id', $noteId)->where('user_id', Auth::id())->delete();
    }

    public function deleteNoteApi(User $user, string $noteId): bool
    {
        return Note::where('id', $noteId)->where('user_id', $user->id)->delete();
    }
}
