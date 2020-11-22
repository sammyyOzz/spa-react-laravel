import React, { useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import { useAxiosGet } from '../Hooks/HttpRequests';


function Home() {

    const url = "http://127.0.0.1:8000/api/auth/user"
    const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}

    const home = useAxiosGet(url, headers)

    const [ {}, dispatch] = useStateValue()

    useEffect(() => {
        dispatch({
            type: 'SET_USER_ID',
            userId: home.id
        })
    }, [home])

    return(
        <div>
            <h2>You are on the home page as {home.name} </h2>
            <h2>Your username is {home.username} </h2>
            <h2>Your profile title is {home.profile_title}</h2>
        </div>
    )
}

export default Home;
