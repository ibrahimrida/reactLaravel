<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ExpenseController;

Route::post('addUser', [RegisterController::class, 'resgisterUser']);


Route::post('userLogin', [LoginController::class,'verifyUserLogin']); //Login
Route::post('logoutUser', 'LoginController@logoutUser')->middleware('cors'); //Logout
Route::get('viewUser', 'LoginController@viewUser')->middleware('cors'); //View user
Route::get('verifyUser', 'LoginController@verifyUserLogin')->middleware('cors'); // Check user
Route::post('addExpense', [ExpenseController::class,'addExpense']); //Add expense

Route::get('getCategories', [ExpenseController::class,'getCategories']); //Get expense category list
Route::post('editExpense', [ExpenseController::class,'editExpense']); //edit expense list
Route::post('deleteExpense', [ExpenseController::class,'deleteExpense']); //delete expense list
Route::get('getExpenseList', [ExpenseController::class,'getUserExpenseList']); //View expense list
Route::get('getExpenseData', [ExpenseController::class,'getExpenseData']); //View expense to edit
Route::get('getExpenseAndUser', [ExpenseController::class,'getExpenseAndUser']); //View expense to edit
Route::post('test', 'LoginController@test')->middleware('cors');