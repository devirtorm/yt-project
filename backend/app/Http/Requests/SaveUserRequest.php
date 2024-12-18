<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveUserRequest extends FormRequest
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
        return [
            "name"=> "required",
            "email"=> "required | unique:users",
            "birthdate"=> "required",
            "gender"=> "required",
            "foto"=> "nullable|image|mimes:jpg,jpeg,png",
            "nombre_canal"=> "nullable",
            "password"=> "required"
        ];
    }
}
