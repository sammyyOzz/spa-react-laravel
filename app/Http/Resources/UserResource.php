<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'username' => $this->username,
            'profile_title' => $this->profile->title,
            'profile_description' => $this->profile->description,
            'profile_url' => $this->profile->url,
            'profile_image' => $this->profile->image,
        ];
    }
}
