import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useAxiosGet, useAxiosGetPost } from '../Hooks/HttpRequests';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';


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
  }));


function Profile() {
    const classes = useStyles();
    const { id } = useParams()
    const url = `http://127.0.0.1:8000/api/profile/${id}`
    const user = useAxiosGet(url)

    const postUrl = `http://127.0.0.1:8000/api/posts/${id}`
    const posts = useAxiosGetPost(postUrl)
    console.log(posts)

    if(! user.profile_image) {
        user.profile_image = 'https://lexcomply.com/siteadmin/admin_dashboard/img/testimonial/no_avatar.jpg'
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

                    <Grid item xs={9} container>
                        <Grid item xs container direction="column" spacing={2}>

                            {/* username, description... */}
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {user.username}
                                    <Button style={{marginLeft: '15px'}} size="small" variant="outlined" href="#">
                                        Edit Profile
                                    </Button>
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

                        {/* add post button */}
                        <Grid item>
                            <Button size="small" variant="outlined" color="primary" component={Link} to="/post">
                                Add Post
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            <div className="" style={{marginTop: "20px"}}>
                <Paper className={classes.paperPosts}>
                    <Typography variant="h4">Posts</Typography>
                        { posts && posts.map(post => (
                            <p>{post?.caption}</p>
                        )) }
                </Paper>
            </div>
        </div>
    )
}

export default Profile
