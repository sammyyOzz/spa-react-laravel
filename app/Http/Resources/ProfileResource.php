<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'profile_title' => $this->title,
            'profile_description' => $this->description,
            'profile_url' => $this->url,
            'profile_image' => $this->image,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'username' => $this->user->username,
        ];
    }
}
