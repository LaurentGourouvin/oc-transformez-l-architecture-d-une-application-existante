<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface NotesServiceInterface
{
    public function loadNotes(): Collection;
    public function createNote(string $tagId, string $text): void;
    public function deleteNote(string $noteId): void;
}
