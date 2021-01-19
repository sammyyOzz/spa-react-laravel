import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { useAxiosGet, useAxiosGetPost } from '../Hooks/HttpRequests';
import PostModal from './PostModal';

const useStyles = makeStyles((theme) => ({
    postImg: {
        height: 'auto',
        width: '100%',
        borderRadius: 15,
    },
  }));


function Home() {
    const classes = useStyles();

    const url = "http://127.0.0.1:8000/api/auth/user"
    const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}

    const home = useAxiosGet(url, headers)
    const posts = useAxiosGetPost("http://127.0.0.1:8000/api/auth/fp", headers)
    console.log(posts)

    const [ {}, dispatch] = useStateValue()

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
                <Grid item xs={7}>
                    <div>
                        {
                            posts && posts.map(post => (
                                <div key={post.id} >
                                    <h3>
                                        <Link
                                          to={`/profile/${post?.user?.id}`}
                                          style={{ textDecoration: 'none', color: 'white' }}
                                        >
                                            {post?.user?.username}
                                        </Link>
                                    </h3>
                                    <p>{post?.caption}</p>
                                    <PostModal
                                        imgSrc={require(`../../../../storage/app/public/uploads${post.upload_file}`)}
                                        imgStyle={classes.postImg}
                                    />
                                    <hr style={{ marginBottom: '50px', marginTop: '35px'}} />
                                </div>
                            ))
                        }
                    </div>
                </Grid>
                <Grid item xs={5} />
            </Grid>
        </div>
    )
}

export default Home;
