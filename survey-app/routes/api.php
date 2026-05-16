<?php

use App\Http\Controllers\Api\GenerateSurveyController;
use App\Http\Controllers\Api\KategoriController;
use App\Http\Controllers\Api\PenilaianController;
use App\Http\Controllers\Api\PeriodeController;
use App\Http\Controllers\Api\PertanyaanController;
use App\Http\Controllers\Api\RespondenController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProdiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'index']);
Route::post('/register', [UserController::class, 'register']);
Route::delete('/user/{id}', [UserController::class, 'destroy']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/survey/{slug}', [GenerateSurveyController::class, 'getSurvey']);
Route::get('/prodi', [ProdiController::class, 'index']); // Jadikan publik untuk dropdown responden

  Route::resource('/penilaian', PenilaianController::class)->only('index', 'show', 'store', 'destroy');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    
     Route::get('/user/current', function (Request $request) {
        return $request->user(); // Mengembalikan data user terautentikasi
    });

    Route::resource('/periode', PeriodeController::class)->only('index', 'store', 'update', 'destroy');

    Route::resource('/pertanyaan', PertanyaanController::class)->only('index', 'store', 'update', 'destroy');

    Route::resource('/responden', RespondenController::class)->only('index', 'store', 'update', 'destroy');


    Route::resource('/kategori', KategoriController::class)->only('index', 'store', 'update', 'destroy');

    Route::post('/survey', [GenerateSurveyController::class, 'generateLink']);

    Route::get('/survey', [GenerateSurveyController::class, 'index']);

    Route::put('/survey/{id}', [GenerateSurveyController::class, 'update']);

    Route::delete('/survey/{id}', [GenerateSurveyController::class, 'destroy']);

    // Prodi dashboard (CRUD tetap dilarang publik)
    Route::resource('/prodi', ProdiController::class)->only('store', 'destroy', 'update');

});
