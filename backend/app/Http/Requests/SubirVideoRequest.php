<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubirVideoRequest extends FormRequest
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
            "titulo" => "required",
            "descripcion" => "required",
            "fk_categoria" => "required",
            "fk_user" => "required",
            "estado" => "nullable",
            "revisado" => "nullable",
            "url" => "required | file | mimes:mp4",
            "miniatura" => "required|image|mimes:jpg,jpeg,png"

        ];
    }
}
