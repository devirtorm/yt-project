<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarVideoRequest extends FormRequest
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
            "estado" => "required",
            "url" => "nullable|file|mimes:mp4", // Permitimos que la URL sea opcional en la edición
            "miniatura" => "nullable|image|mimes:jpg,jpeg,png" // Permitimos que la miniatura sea opcional en la edición
        ];
    }
}
