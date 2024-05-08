<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class forgotPassword extends Controller
{
    //
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
    
        // Verifica si el correo electrónico existe en la base de datos
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'El correo electrónico proporcionado no existe.'], 404);
        }
    
        // Si el correo electrónico existe, genera un código de verificación
        $verificationCode = rand(100000, 999999);
    
        // Guarda el código de verificación en la tabla 'password_resets'
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $verificationCode,
            'created_at' => now()
        ]);
    
        // Envía el correo electrónico con el código de verificación
        Mail::to($request->email)->send(new ResetPasswordMail($verificationCode));
    
        return response()->json(['message' => 'Correo electrónico enviado con éxito.'], 200);
    }

    public function verifyPin(Request $request)
    {
        $request->validate([
            'pin' => 'required|string|digits:6' // Asegúrate de que el PIN tenga exactamente 6 dígitos
        ]);

        // Busca el registro de restablecimiento de contraseña con el correo electrónico dado y el PIN proporcionado
        $resetRecord = DB::table('password_resets')
            ->where('token', $request->pin)
            ->first();

        if ($resetRecord) {
            // El PIN es válido, puedes redirigir al usuario a la página de restablecimiento de contraseña
            return response()->json(['message' => 'PIN válido. Redirigir al usuario a la página de restablecimiento de contraseña.']);
        } else {
            // El PIN no es válido
            throw ValidationException::withMessages([
                'pin' => ['El PIN proporcionado no es válido.'],
            ]);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'pin' => 'required|string|digits:6',
            'password' => 'required|min:8'
        ]);
    
        // Verificar si el correo electrónico existe en la base de datos
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'El correo electrónico proporcionado no existe.'], 404);
        }
    
        // Verificar el PIN
        $resetRecord = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->pin)
            ->first();
    
        if ($resetRecord) {
            // Actualizar la contraseña
            $user->update(['password' => Hash::make($request->password)]);
    
            // Eliminar el registro de restablecimiento de contraseña
            DB::table('password_resets')
                ->where('email', $request->email)
                ->delete();
    
            return response()->json(['message' => 'Contraseña restablecida exitosamente.'], 200);
        } else {
            // El PIN no es válido
            return response()->json(['message' => 'El PIN proporcionado no es válido.'], 400);
        }
    }
    
}
