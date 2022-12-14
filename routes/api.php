<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('todo', [TodoController::class, "index"])->name('api.todo.index');
Route::post('todo', [TodoController::class, "store"])->name('api.todo.store');
Route::delete('todo/{todo}', [TodoController::class, "delete"])->name('api.todo.delete');
