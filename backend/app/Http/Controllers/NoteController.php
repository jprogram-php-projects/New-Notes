<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class NoteController extends Controller
{

    public function newNote(Request $request)
    {
        $request->validate([
            'text_title' => 'required|min:3|max:200',
            'text_note'  => 'required|min:3|max:3000'
        ]);

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'Token inválido ou expirado'], 401);
        }

        $note = new Note();
        $note->user_id = $user->id;
        $note->title   = $request->text_title;
        $note->text    = $request->text_note;
        $note->save();

        return response()->json([
            'success' => true,
            'message' => 'Nota criada com sucesso',
            'note'    => $note
        ], 201);
    }

    public function index()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $notes = Note::where('user_id', $user->id)->get();

            return response()->json($notes);

        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token ausente ou inválido'], 401);
        }
    }

    public function show($id)
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['error' => 'Nota não encontrada'], 404);
        }
        return response()->json($note);
    }

    public function editNote(Request $request, $id)
    {
        // validação
        $validated = $request->validate(
            [
                'text_title' => 'required|min:3|max:200',
                'text_note'  => 'required|min:3|max:3000'
            ],
            [
                'text_title.required' => 'O título é obrigatório!',
                'text_title.min'      => 'O título deve ter pelo menos :min caracteres',
                'text_title.max'      => 'O título deve ter no máximo :max caracteres',
                'text_note.required'  => 'A nota é obrigatória!',
                'text_note.min'       => 'A nota deve ter pelo menos :min caracteres',
                'text_note.max'       => 'A nota deve ter no máximo :max caracteres',
            ]
        );

        // buscar nota
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['error' => 'Nota não encontrada'], 404);
        }

        // atualizar
        $note->title = $validated['text_title'];
        $note->text  = $validated['text_note'];
        $note->save();

        return response()->json([
            'message' => 'Nota atualizada com sucesso',
            'note' => $note
        ], 200);
    }

    public function deleteNote($id)
    {
        // $id = Operations::decryptId($id);

        if ($id === null) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid note ID'
            ], 400);
        }

        $note = Note::find($id);

        if (!$note) {
            return response()->json([
                'success' => false,
                'message' => 'Note not found'
            ], 404);
        }

        // Soft delete (property SoftDeletes in model)
        $note->delete();

        return response()->json([
            'success' => true,
            'message' => 'Note deleted successfully'
        ], 200);
    }


}

