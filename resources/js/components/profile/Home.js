import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

    const [home, setHome] = useState({ data:{} })

    useEffect(() => {
        const fetchHome = () => {
            axios.get('http://127.0.0.1:8000/api/auth/user', {
                headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }
            })
            .then(res => {
                setHome({...home, data: res.data})
            })
            .catch(err => console.log(err))
        }

        fetchHome();
    }, []);



    return(
        <div>
            <h2>You are on the home page as {home.data.name} </h2>
        </div>
    )
}

export default Home;
