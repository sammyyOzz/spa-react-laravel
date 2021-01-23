<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function store(Post $post, Request $request)
    {
    	return $request->user()->likes()->toggle($post);
    }

    public function likecheck(Post $post, Request $request)
    {
        $likes = ($request->user()) ? $post->likes->contains($request->user()) : false;

        return $likes;
    }
}
