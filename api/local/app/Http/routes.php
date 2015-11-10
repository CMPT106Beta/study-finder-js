<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::post('signup','RegistrationController@create');


Route::group(['middleware' => 'jwt.auth'], function() {
    Route::get('/groups',function(){
        return \App\Group::all();
    });
});

Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
Route::post('authenticate', 'AuthenticateController@authenticate');
Route::get('authenticate/user','AuthenticateController@getAuthenticatedUser');

Route::resource('group','GroupController');

Route::resource('profile','ProfileController');

