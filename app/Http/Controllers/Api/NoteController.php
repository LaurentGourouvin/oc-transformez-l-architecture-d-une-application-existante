<?php

namespace App\Http\Controllers\Api;

use App\Contracts\NotesServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Note\NoteCreateRequest;
use App\Http\Resources\NoteResource;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{

    use ApiResponse;

    private NotesServiceInterface $notesService;
    public function __construct(NotesServiceInterface $notesService)
    {
        $this->notesService = $notesService;
    }

    /**
     * @OA\Get(
     *     path="/api/notes",
     *     summary="Get all notes",
     *     tags={"Notes"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Notes retrieved"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function getNotes(Request $request) : JsonResponse {
        return $this->success(
            NoteResource::collection($this->notesService->loadNotesApi($request->user())),
            'Notes retrieved'
        );
    }

    /**
     * @OA\Post(
     *     path="/api/notes",
     *     summary="Create a note",
     *     tags={"Notes"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"text","tag_id"},
     *             @OA\Property(property="text", type="string", example="Ma note"),
     *             @OA\Property(property="tag_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Note created"),
     *     @OA\Response(response=422, description="Validation failed"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function createNote(NoteCreateRequest $request): JsonResponse
    {
        $note = $this->notesService->createNoteApi(
            $request->user(),
            $request->tag_id,
            $request->text
        );

        return $this->created(new NoteResource($note->load('tag')), 'Note created');
    }

    /**
     * @OA\Delete(
     *     path="/api/notes/{id}",
     *     summary="Delete a note",
     *     tags={"Notes"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Note deleted"),
     *     @OA\Response(response=404, description="Note not found"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function deleteNote(Request $request, int $id): JsonResponse
    {
        $deleted = $this->notesService->deleteNoteApi($request->user(), $id);

        if (!$deleted) {
            return $this->error('Note not found', 404);
        }

        return $this->noContent('Note deleted');
    }
}
