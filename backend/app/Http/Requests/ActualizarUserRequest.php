<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userId = $this->route('id');

        return [
            "name"=> "",
            "email"=> "email",
            "birthdate"=> "",
            "gender"=> "",
            "nombre_canal"=> "",
            "password"=> "nullable",
            "estado"=> "",
            "foto" => ""

        ];
    }
}
