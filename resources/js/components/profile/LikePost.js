import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Axios from 'axios';

function LikePost({ postId }) {
    const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}
    const [likeButton, setLikeButton] = useState(false)

    useEffect(() => {
        const checkLike = () => {
            Axios.get(`http://127.0.0.1:8000/api/auth/likecheck/${postId}`, headers)
            .then(res => {
                res.data ? setLikeButton(true) : setLikeButton(false)
            })
            .catch(err => console.log(err))
        }

        checkLike()
    }, [])

    const likePost = post => {
        Axios.get(`/api/auth/like/${post}`, headers)
        .then(() => setLikeButton(prevState => ! prevState))
        .catch(err => console.log(err))
    }

    return (
        <div onClick={() => likePost(postId)}>
            {
                likeButton ? <FavoriteIcon style={{color: 'red'}} /> : <FavoriteBorderIcon />
            }
        </div>
    )
}

export default LikePost
