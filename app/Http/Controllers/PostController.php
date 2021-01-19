<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

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

    public function index(User $user)
    {
        return $user->posts;
    }

    public function followingposts(Request $request)
    {
        $users = $request->user()->following()->pluck('profiles.user_id');

        $posts = Post::whereIn('user_id', $users)->with('user')->latest()->get();

        return $posts;
    }
}
