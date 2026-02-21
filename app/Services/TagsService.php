<?php

namespace App\Services;

use App\Contracts\TagsServiceInterface;
use App\Models\Tag;

class TagsService implements TagsServiceInterface
{

    public function createTag(string $name): void
    {
        Tag::create(['name' => $name]);
    }
}
