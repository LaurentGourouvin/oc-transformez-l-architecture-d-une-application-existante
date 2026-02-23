<?php

namespace App\Http\Controllers\Api;

use App\Contracts\TagsServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Tag\TagCreateRequest;
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


    /**
     * @OA\Post(
     *     path="/api/tags",
     *     summary="Create a tag",
     *     tags={"Tags"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Mon tag")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Tag created"),
     *     @OA\Response(response=422, description="Validation failed"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function createTag(TagCreateRequest $request): JsonResponse {
        $tag = $this->tagsService->createTagApi($request->name);
        return $this->created(new TagResource($tag), 'Tag created');
    }

    /**
     * @OA\Get(
     *     path="/api/tags",
     *     summary="Get all tags",
     *     tags={"Tags"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Tags retrieved"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function getAllTags(Request $request): JsonResponse {
        return $this->success(
            TagResource::collection($this->tagsService->getAllTags()),
            'Tags retrieved'
        );
    }
}
