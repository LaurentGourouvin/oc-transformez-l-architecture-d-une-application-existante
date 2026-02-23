<?php

namespace App\Contracts;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;

interface TagsServiceInterface
{
    public function createTag(string $name): void;
    public function createTagApi(string $name): Tag;

    public function getAllTags(): Collection;
}
