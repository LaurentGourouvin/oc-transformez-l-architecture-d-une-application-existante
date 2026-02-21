<?php

namespace App\Livewire;

use App\Contracts\NotesServiceInterface;
use Illuminate\Support\Collection;
use Livewire\Component;
use App\Models\Note;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;

class Notes extends Component
{
    public $notes;
    public $text = '';
    public $tag_id = '';
    public $tags;

    protected $rules = [
        'text' => 'required|string',
        'tag_id' => 'required|exists:tags,id',
    ];
    protected $listeners = ['tagCreated' => 'refreshTags'];

    public function mount(NotesServiceInterface $notesService)
    {
        $this->tags = Tag::all();
        $this->notes = $notesService->loadNotes();
    }

    public function refreshTags()
    {
        $this->tags = \App\Models\Tag::all();
    }

    public function save(NotesServiceInterface $notesService)
    {
        $this->validate();

        $notesService->createNote($this->tag_id, $this->text);

        $this->text = '';
        $this->tag_id = '';

        $this->notes = $notesService->loadNotes();

        session()->flash('message', 'Note added.');
    }

    public function delete($noteId, NotesServiceInterface $notesService)
    {
        $notesService->deleteNote($noteId);
        $this->notes = $notesService->loadNotes();
    }

    public function render()
    {
        return view('livewire.notes');
    }
}
