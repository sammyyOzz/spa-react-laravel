<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

class PostController extends Controller
{
    public function store(Request $request)
    {
        if($request->get('upload_file'))
        {
          $image = $request->get('upload_file');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          Image::make($request->get('upload_file'))->save(public_path('storage/uploads').$name);
        }

        $fileupload = new Post();
        $fileupload->caption = $request->caption;
        $fileupload->upload_file = $name;
        $fileupload->user_id = $request->user()->id;
        $fileupload->save();

        return response()->json('Successfully added');
    }
}
