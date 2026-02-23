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

    public function getNotes(Request $request) : JsonResponse {
        return $this->success(
            NoteResource::collection($this->notesService->loadNotesApi($request->user())),
            'Notes retrieved'
        );
    }

    public function createNote(NoteCreateRequest $request): JsonResponse
    {
        $note = $this->notesService->createNoteApi(
            $request->user(),
            $request->tag_id,
            $request->text
        );

        return $this->created(new NoteResource($note->load('tag')), 'Note created');
    }

    public function deleteNote(Request $request, int $id): JsonResponse
    {
        $deleted = $this->notesService->deleteNoteApi($request->user(), $id);

        if (!$deleted) {
            return $this->error('Note not found', 404);
        }

        return $this->noContent('Note deleted');
    }
}
