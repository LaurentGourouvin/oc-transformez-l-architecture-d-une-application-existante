<?php

namespace App\Services;

use App\Contracts\TagsServiceInterface;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;

class TagsService implements TagsServiceInterface
{

    public function createTag(string $name): void
    {
        Tag::create(['name' => $name]);
    }

    public function getAllTags(): Collection
    {
        return Tag::all();
    }

    public function createTagApi(string $name): Tag
    {
        return Tag::create(['name' => $name]);
    }
}
