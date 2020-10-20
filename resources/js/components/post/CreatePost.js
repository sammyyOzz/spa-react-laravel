import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
        display: 'flex',
        justifyContent: 'center'
      },
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
        minHeight: 450
      },
  }));

function CreatePost() {
    const history = useHistory();
    const classes = useStyles();

    const [post, setPost] = useState({
        caption: "",
        upload_file: null
    });

    const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}

    function handleSubmit(e) {
        e.preventDefault();

        axios.post("/api/auth/p", post, headers)
        .then(res => {
            history.push('/profile/1');
        })
        .catch(err => console.log(err))
    }

    const handleCaption = e => {
        let value = e.target.value;
        setPost({...post, caption: value});
    }

    const handleUploadFile = e => {
        let file_reader = new FileReader();

        // Get the actual file itself
        let file = e.target.files[0];

        file_reader.onload = () => {
            // After uploading the file
            // appending the file to our state array
            // set the object keys and values accordingly
            setPost({...post, upload_file: file_reader.result });
        };

        // reading the actual uploaded file
        file_reader.readAsDataURL(file);
    }

    return(
        <div>
            <Paper className={classes.paper}>
                <Grid container spacing={10}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" >
                            <TextField
                            required
                            label="caption"
                            type="text"
                            placeholder="caption"
                            variant="outlined"
                            onChange={handleCaption}
                            /> <br/>

                            <Input type="file" name="file" onChange={handleUploadFile} /> <br/>
                            <Button type="submit" variant="contained" color="primary">Post</Button>
                        </form>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default CreatePost;
