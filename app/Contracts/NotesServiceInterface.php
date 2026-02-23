<?php

namespace App\Contracts;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface NotesServiceInterface
{
    public function loadNotes(): Collection;
    public function loadNotesApi(User $user): Collection;

    public function createNote(string $tagId, string $text): void;
    public function createNoteApi(User $user, string $tagId, string $text): Note;

    public function deleteNote(string $noteId): void;
    public function deleteNoteApi(User $user, string $noteId): bool;

}
