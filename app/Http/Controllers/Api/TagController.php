<?php

namespace App\Http\Controllers\Api;

use App\Contracts\TagsServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    use ApiResponse;
    private TagsServiceInterface $tagsService;

    public function __construct(TagsServiceInterface $tagsService) {
        $this->tagsService = $tagsService;
    }

    public function createTag(Request $request): JsonResponse {
        $tag = $this->tagsService->createTagApi($request->name);
        return $this->created(new TagResource($tag), 'Tag created');
    }

    public function getAllTags(Request $request): JsonResponse {
        return $this->success(
            TagResource::collection($this->tagsService->getAllTags()),
            'Tags retrieved'
        );
    }
}
