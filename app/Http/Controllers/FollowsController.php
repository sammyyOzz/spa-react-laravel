<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowsController extends Controller
{
    public function store(User $user, Request $request)
    {
    	return $request->user()->following()->toggle($user->profile);
    }

    public function following(User $user)
    {
        return $user->following;
    }

    public function followers(User $user)
    {
        return $user->profile->followers;
    }

    public function followcheck(User $user, Request $request)
    {
        $follows = ($request->user()) ? $request->user()->following->contains($user->id) : false;

        return $follows;
    }
}
