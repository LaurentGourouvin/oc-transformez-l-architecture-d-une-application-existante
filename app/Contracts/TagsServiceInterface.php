<?php

namespace App\Contracts;

interface TagsServiceInterface
{
    public function createTag(string $name): void;
}
