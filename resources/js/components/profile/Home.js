import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { useAxiosGet, useAxiosGetPost } from '../Hooks/HttpRequests';
import PostModal from './PostModal';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import LikePost from './LikePost';

const useStyles = makeStyles((theme) => ({
    postImg: {
        height: 'auto',
        width: '100%',
        borderRadius: 15,
    },
    caption: {
        backgroundColor: 'gray',
        padding: '5px',
        display: 'inline-block',
        borderRadius: '6px'
    }
}));


function Home() {
    const classes = useStyles();

    const url = "http://127.0.0.1:8000/api/auth/user"
    const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}

    const home = useAxiosGet(url, headers)
    const posts = useAxiosGetPost("http://127.0.0.1:8000/api/auth/fp", headers)

    const [ { }, dispatch] = useStateValue()

    useEffect(() => {
        localStorage.setItem('userId', home.id)
        dispatch({
            type: 'SET_USER_ID',
            userId: home.id
        })
    }, [home])

    return(
        <div>
            <Grid container>
                <Grid item md={2} />
                <Grid item xs={12} md={5}>
                    <div>
                        {
                            posts && posts.map(post => (
                                <div key={post.id} >
                                    <h3>
                                        <Link
                                          to={`/profile/${post?.user?.id}`}
                                          style={{ textDecoration: 'none', color: 'black' }}
                                        >
                                            {post?.user?.username}
                                        </Link>
                                    </h3>
                                    <p className={classes.caption}>{post?.caption}</p>
                                    <PostModal
                                        imgSrc={require(`../../../../storage/app/public/uploads${post.upload_file}`)}
                                        imgStyle={classes.postImg}
                                    />
                                    <div style={{ marginTop: '10px', display: 'flex', padding: '5px', backgroundColor: '#424242', borderRadius: '10px', width: '160px' }}>
                                        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                                            <span style={{paddingRight: '7px', color: 'white', paddingBottom: '2px'}}>
                                                {post?.comments?.length}
                                            </span>
                                            <Link to={`/post/${post.id}`}>
                                                <ChatBubbleIcon style={{ color: 'white' }} />
                                            </Link>
                                        </div>
                                        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                                            <span style={{ paddingRight: '7px', color: 'white', paddingBottom: '3px' }}>
                                                {post?.likes?.length}
                                            </span>
                                            <LikePost
                                                postId={post?.id}
                                            />
                                        </div>
                                    </div>
                                    <hr style={{ marginBottom: '50px', marginTop: '35px'}} />
                                </div>
                            ))
                        }
                    </div>
                </Grid>
                <Grid item xs={12} md={3} />
                <Grid item md={2} />
            </Grid>
        </div>
    )
}

export default Home;
