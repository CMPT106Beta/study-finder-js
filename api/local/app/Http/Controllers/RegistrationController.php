<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegistrationController extends Controller
{
    public function create(Request $request){

        //$this->validate($request, ['email'=>'required|unique:users','password'=>'required']);

        $email = $request->input('email');
        $password = $request->input('password');

        $user = new User();
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));

    }
}
