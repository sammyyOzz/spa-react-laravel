import React from 'react'
import { useParams } from 'react-router-dom';
import { useAxiosGet } from '../Hooks/HttpRequests';


function Profile() {

    const { id } = useParams()
    const url = `http://127.0.0.1:8000/api/profile/${id}`
    const user = useAxiosGet(url)


    return (
        <div>
            <h2>This profile belongs to {user.name}</h2>
            <h2>This profile title is {user.profile_title}</h2>
        </div>
    )
}

export default Profile
