<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{

    public function login()
    {
        return view('login');
    }

    public function loginSubmit(Request $request)
    {
        // dd($request);
        // echo $request->input('text_username'). '<br/>'. $request->input('text_password');

        $request->validate(
            // rules
            [
                'text_username' => 'required|email',
                'text_password' => 'required|min:6|max:16'
            ],
            // error messages
            [
                'text_username.required' => 'O username é obrigatório!',
                'text_username.email'    => 'Username deve ser um email válido!',
                'text_password.required' => 'A password é obrigatória!',
                'text_password.min'      => 'A password deve ter pelo menos :min caracteres',
                'text_password.max'      => 'A password deve ter no máximo :max caracteres',
            ]
        );

        // get user input
        $username = $request->input('text_username');
        $password = $request->input('text_password');

        // try {
        //     DB::connection()->getPdo();
        //     echo 'Connection is OK!';
        // } catch (\PDOException $e) {
        //     echo 'Connection failed: '. $e->getMessage();
        // }

        // echo 'FIM!';

        // get all the users from the database
        // $users = User::get()->toArray();

        // as an object instance of the model's class
        // $userModel = new User();
        // $users = $userModel::get()->toArray();

        // check if user exists
        $user = User::where('username', $username)
                      ->where('deleted_at', NULL)
                      ->first();

        if(!$user){
            return redirect()
                    ->back()
                    ->withInput()
                    ->with('loginError', 'Username ou password estão incorretos!');
        }

        // check if password is correct
        if(!password_verify($password, $user->password)){
            return redirect()
                    ->back()
                    ->withInput()
                    ->with('loginError', 'Username ou password estão incorretos!');
        }

        session([
            'user' => [
                'id' => $user->id,
                'username' => $user->username
            ]
        ]);

        // echo '<pre>';
        // print_r($user);
        return redirect()->to('/');
    }

    public function logout()
    {
        // logout from the application
        session()->forget('user');
        return redirect()->to('/login');
    }

    public function apiLogin(Request $request)
    {
        $request->validate([
            'username' => 'required|email',
            'password' => 'required|min:6|max:16',
        ]);

        $user = User::where('username', $request->username)
                    ->whereNull('deleted_at')
                    ->first();

        if (!$user || !password_verify($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        return response()->json([
            'id' => $user->id,
            'username' => $user->username
        ]);
    }
}



