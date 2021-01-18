import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useAxiosGet, useAxiosGetPost } from '../Hooks/HttpRequests';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import PostModal from './PostModal';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 800,
    },
    paperPosts: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
        minHeight: 250
      },
    image: {
      width: 140,
      height: 140,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: '50%'
    },
    postImg: {
        // objectFit: 'contain',
        height: 180,
        width: '100%',
        borderRadius: 30,
        transition: 'all 200ms linear',
        '&:hover': {
            boxShadow: '3px 5px 8px gray',
            transform: 'scale(1.15)',
            transition: 'all 200ms linear'
        }
    },
    postImgSub: {
        height: 130,
        width: '100%',
        borderRadius: 30,
        transition: 'all 200ms linear',
        '&:hover': {
            boxShadow: '3px 5px 8px gray',
            transform: 'scale(1.2)',
            transition: 'all 200ms linear'
        }
    }
  }));


function Profile() {
    const classes = useStyles();
    const userId = localStorage.getItem('userId')
    const { id } = useParams()
    const url = `http://127.0.0.1:8000/api/profile/${id}`
    const user = useAxiosGet(url)
    const postUrl = `http://127.0.0.1:8000/api/${id}/posts`
    const posts = useAxiosGetPost(postUrl)
    const followersUrl = `http://127.0.0.1:8000/api/followers/${id}`
    const followers = useAxiosGetPost(followersUrl)
    const followingUrl = `http://127.0.0.1:8000/api/following/${id}`
    const following = useAxiosGetPost(followingUrl)

    const [followButton, setFollowButton] = useState(false)

    const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}

    useEffect(() => {
        const checkFollowing = () => {
            axios.get(`http://127.0.0.1:8000/api/auth/followcheck/${id}`, headers)
            .then(res => {
                res.data ? setFollowButton(true) : setFollowButton(false)
            })
            .catch(err => console.log(err))
        }

        checkFollowing()
    }, [url])

    if(! user.profile_image) {
        user.profile_image = 'https://lexcomply.com/siteadmin/admin_dashboard/img/testimonial/no_avatar.jpg'
    }

    const followUser = () => {
        axios.get(`http://127.0.0.1:8000/api/auth/follow/${id}`, headers)
        .catch(err => console.log(err))
        setFollowButton(prevState => ! prevState)
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={10}>

                    {/* profile Image */}
                    <Grid item xs={3}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="profile image" src={user.profile_image} />
                        </ButtonBase>
                    </Grid>

                    <Grid item xs={4} container>
                        <Grid item xs container direction="column">

                            {/* username, description... */}
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {user.username}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <strong>{user.profile_title}</strong>
                                </Typography>
                                <Typography variant="body1" color="textPrimary">
                                    {user.profile_description}
                                </Typography>
                            </Grid>

                            {/* profile url */}
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }} color="textSecondary">
                                    {user.profile_url}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item container xs={2} direction="column" alignItems="center" justify="space-between">
                        <Grid item container direction="column" alignItems="center">
                            <Grid item><Typography variant="h6" style={{color: 'skyblue'}}>{posts?.length}</Typography></Grid>
                            <Grid item><Typography variant="overline" style={{color: 'skyblue'}}>posts</Typography></Grid>
                        </Grid>
                        <Grid item container direction="column" alignItems="center">
                            <Grid item><Typography variant="h6" style={{color: '#76ff03'}}>{followers?.length}</Typography></Grid>
                            <Grid item><Typography variant="overline" style={{color: '#76ff03'}}>followers</Typography></Grid>
                        </Grid>
                        <Grid item container direction="column" alignItems="center">
                            <Grid item><Typography variant="h6" style={{color: 'yellow'}}>{following?.length}</Typography></Grid>
                            <Grid item><Typography variant="overline" style={{color: 'yellow'}}>following</Typography></Grid>
                        </Grid>
                    </Grid>

                    {/* add post button */}
                    <Grid item container xs={3} direction="column" justify="space-between" alignItems="flex-end">
                        {
                            userId !== id &&
                            <Grid item>
                                <Button
                                onClick={followUser}
                                size="small"
                                variant="contained"
                                style={{ color: 'white', backgroundColor: 'green' }}>
                                    {
                                        followButton ? "Unfollow" : "follow"
                                    }
                                </Button>
                            </Grid>
                        }
                        {
                            userId == id &&
                            <Grid item>
                                <Button size="small" variant="contained" color="primary" component={Link} to="/post">
                                    Add Post
                                </Button>
                            </Grid>
                        }
                        {
                            userId == id &&
                            <Grid item>
                                <Button size="small" variant="outlined" href="#">
                                    Edit Profile
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Paper>

            {/* posts section */}
            <div className="" style={{marginTop: "20px"}}>
                <Paper className={classes.paperPosts}>
                    <Typography variant="h4">Posts</Typography>
                        <Grid container spacing={3}>
                            <Grid item md={2} />
                            {
                                posts && posts.map((post, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <Grid key={post.id} item xs={4} md={3}>
                                                <PostModal
                                                    imgSrc={require(`../../../../storage/app/public/uploads${post.upload_file}`)}
                                                    imgStyle={classes.postImg}
                                                />
                                            </Grid>
                                        )
                                    } else {
                                        return (
                                            <Grid item container key={post.id} xs={4} md={3}>
                                                <Grid item xs={4} />
                                                <Grid item xs={8}>
                                                    <PostModal
                                                    imgSrc={require(`../../../../storage/app/public/uploads${post.upload_file}`)}
                                                    imgStyle={classes.postImgSub}
                                                />
                                                </Grid>
                                            </Grid>
                                        )
                                    }
                                })
                            }
                            <Grid item md={2} />
                        </Grid>

                </Paper>
            </div>
        </div>
    )
}

export default Profile
