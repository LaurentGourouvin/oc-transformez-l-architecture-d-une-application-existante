<?php

namespace App\Livewire;

use App\Contracts\TagsServiceInterface;
use Livewire\Component;
use App\Models\Tag;

class TagForm extends Component
{
    public $name = '';

    protected $rules = [
        'name' => 'required|string|max:50|unique:tags,name',
    ];

    public function save(TagsServiceInterface $tagsService): void
    {
        $this->validate();

        $tagsService->createTag($this->name);

        $this->reset('name');

        $this->dispatch('tagCreated');

        session()->flash('message', 'Tag added!');
    }

    public function render()
    {
        return view('livewire.tag-form');
    }
}
