import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { headers } from '../Utilities/constants'
import { makeStyles } from '@material-ui/core'
import { useStateValue } from '../../StateProvider'

const useStyles = makeStyles((theme) => ({
    comment: {
        padding: '5px',
        borderRadius: '6px',
        marginBottom: '30px',
        backgroundColor: 'gray',
    },
    username: {
        color: 'purple',
    },
    commentText: {
        paddingTop: '15px',
        paddingLeft: '25px'
    }
}));

function Comment() {
    const classes = useStyles()
    const { id } = useParams()
    const [comment, setComment] = useState({comment: '', post_id: id})
    const [comments, setComments] = useState([ ])
    const [ {userData} ] = useStateValue()

    useEffect(() => {
        const fetchComments = () => {
            Axios.get(`/api/auth/${id}/comments`, headers)
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
        }

        fetchComments()
    }, [])

    const handleComment = e => {
        let value = e.target.value;
        setComment({...comment, comment: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        Axios.post(`/api/auth/comment`, comment, headers)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        const newComment = {
            id: Math.random(),
            user: userData,
            comment: comment.comment
        }

        setComments(prevState => [...prevState, newComment])

        setComment({comment: ''})
    }

    return (
        <div>
            <Grid container>
                <Grid item md={3} />
                <Grid item xs={12} md={6}>
                    <div style={{marginBottom: '80px'}}>
                        {
                            comments &&
                            comments.map(comment => (
                                <div key={comment?.id} className={classes.comment}>
                                    <span className={classes.username}>
                                        <strong>{comment?.user?.username}</strong>
                                    </span><br/>
                                    <span className={classes.commentText}>
                                        {comment?.comment}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </Grid>
                <Grid item md={3} />
            </Grid>
            <div className="chat__textbox">
                <form onSubmit={handleSubmit} noValidate autoComplete="off" >
                    <TextField
                        className="chat__input"
                        type="text"
                        placeholder="comment on post"
                        variant="outlined"
                        value={comment.comment}
                        onChange={handleComment}

                    />
                    <Button color="primary" variant="contained" type="submit" className="chat__sendButton">
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Comment
