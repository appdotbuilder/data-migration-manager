<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarkProductionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->isSuperadmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file' => 'required|file|mimes:xlsx,xls|max:10240',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.required' => 'Excel file is required.',
            'file.mimes' => 'File must be an Excel file (.xlsx or .xls).',
            'file.max' => 'File size cannot exceed 10MB.',
        ];
    }
}