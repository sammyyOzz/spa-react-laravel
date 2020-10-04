import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Logout() {

    const history = useHistory()

    const logout = () => {
        if(localStorage.usertoken) {
            axios.get('http://127.0.0.1:8000/api/auth/logout', {
                headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }
            })
            .then(() => history.push('/'))
            .catch(err => console.log(err))
        }
    }

    logout()

    return (
        <div>

        </div>
    )
}

export default Logout
