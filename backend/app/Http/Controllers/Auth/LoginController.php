<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\User;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    public function verifyUserLogin(Request $request){  
        Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required','string', 'max:255']
        ])->validate();   
        $email = $request->get('email');
        $password = $request->get('password'); 
        // $credentials = array('email' => $email, 'password' => $password);
        $user = User::where('email', $email)->first();
        if ($user === null || ! (Hash::check($password, $user->password))) {
            return response()->json(['status'=> 'fail', 'message'=>'Icorrect Email or Password']);
        }else{
            Auth::login($user); 
            return response()->json(['status'=> 'success', 'message'=>'User logedin', 'userinfo'=>Auth::user()]);
        }
    }
}
