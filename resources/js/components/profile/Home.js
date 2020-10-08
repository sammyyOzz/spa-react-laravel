import React from 'react';
import { useAxiosGet } from '../Hooks/HttpRequests';


function Home() {

    const url = "http://127.0.0.1:8000/api/auth/user"
    const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}

    const home = useAxiosGet(url, headers)


    return(
        <div>
            <h2>You are on the home page as {home.name} </h2>
            <h2>Your profile title is {home.profile_title}</h2>
        </div>
    )
}

export default Home;
