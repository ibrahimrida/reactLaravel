<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\UserManagement;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{ 
    public function __construct(){
        auth()->setDefaultDriver('api');
    }

    public function verifyUserLogin(Request $request){  
        Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required','string', 'max:255']
        ])->validate();   
        $email = $request->get('email');
        $password = $request->get('password'); 
        $credentials = array('email' => $email, 'password' => $password);
        $user = User::where(['email', '=', $email],['password','=',Hash::make($password)]);
        Auth::login($user); 
        if ($user === null) {
            return response()->json(['status'=> 'fail', 'message'=>'User not found']);
        }else{
            return response()->json(['status'=> 'success', 'message'=>'User logedin', 'userinfo'=>Auth::user()]);
        }
    }

    public function logoutUser(Request $request){
        auth()->logout();
        return response()->json(['status'=> 'success', 'message' => 'Successfully logged out']);
    }

    public function viewUser(Request $request) {
        $data['id'] = auth()->user()->id;
        $data['name'] = auth()->user()->name;
        $data['email'] = auth()->user()->email;
        $data['city'] = auth()->user()->city;
        $data['age'] = auth()->user()->age;


        return response()->json(['status'=> 'success', 'userdata' => $data]);
    }

    public function resgisterUser(Request $request){
        Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255','unique:users'],
            'name' => ['required','string', 'max:255'],
            'password' => ['required','string','confirmed', 'max:255']
        ])->validate();
        if(empty(auth()->user())){
            $name = $request->get('name');
            $email = $request->get('email');
            $password =$request->get('password');
            User::create([
                'name'=>$name,
                'email'=>$email,
                'password'=>Hash::make($password)
            ]);
            $response = array('status'=> 'success', 'message'=>'user added succesfully');
        }else{
            $response = array('status'=> 'fail', 'message'=>'Logedin user can not register new user.');
        }

        return json_encode($response);
    }

    // public function resgisterUser(Request $request){
    //     if(Auth::check()){
    //         $response = array('status'=> 'fail', 'message'=>'Logedin user can not register new user.');
    //     }else{
    //         $name = $request->name;
    //         $email = $request->email;
    //         $password = Hash::make($request->password);
    //         $city = $request->city;
    //         $age = $request->age;
    //         $token = $request->token;
    
    //         $data = array('name'=>$name,'email'=> $email,'password'=> $password,'city'=> $city,'age'=> $age);
    //         $db = new UserManagement();
    //         $db->registerNewUser($data);
    //         $response = array('status'=> 'success', 'message'=>'user added succesfully');
    //     }
    //     return json_encode($response);
    // }

    public function test(Request $request){
        if(Auth::check()){
            return json_encode(['msg'=>Auth::user()]);
        }else{
            return json_encode(['msg'=>'User not loged in']);
        }  
    }



}