<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $data = request()->validate([
            // 'caption'       => 'required',
			'upload_file'   => ['required', 'file' => 'mimes:jpeg,bmp,png,avi,mpeg,quicktime,mp4']
        ]);

        $request->user()->posts()->create($data);

        $uploadPath = request('upload_file')->store('uploads', 'public');
    }
}
