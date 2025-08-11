<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\NoteController;
use App\Http\Middleware\CheckIsLogged;


Route::middleware(['jwt.auth'])->group(function(){

    Route::controller(NoteController::class)->group(function(){

        Route::post('/newNote'      , 'newNote'     );
        Route::get('/notes'         , 'index'       );
        Route::get('/notes/{id}'    , 'show'        );
        Route::put('/notes/{id}'    , 'editNote'    );
        Route::delete('/notes/{id}' , 'deleteNote'  );

    });
});

