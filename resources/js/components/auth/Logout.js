import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';

function Logout() {

    const [ {}, dispatch ] = useStateValue();

    const history = useHistory()

    const logout = () => {
        if(localStorage.usertoken) {
            axios.get('http://127.0.0.1:8000/api/auth/logout', {
                headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }
            })
            .then(() => {
                dispatch({
                    type: 'SET_USER',
                    user: false
                })
                dispatch({
                    type: 'SET_USER_ID',
                    userId: null
                })
                localStorage.removeItem('usertoken')
                history.push('/')
            })
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
