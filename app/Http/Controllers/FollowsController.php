<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowsController extends Controller
{
    public function store(User $user)
    {
    	return auth()->user()->following()->toggle($user->profile);
    }

    public function following(User $user)
    {
        return $user->following;
    }

    public function followers(User $user)
    {
        return $user->profile->followers;
    }
}
