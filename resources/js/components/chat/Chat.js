import React, { useState, useEffect } from 'react'
import { headers } from '../Utilities/constants'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import { useStateValue } from '../../StateProvider';
import Pusher from 'pusher-js'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    message: {
        backgroundColor: 'gray',
        padding: '1px 1px 1px 1px',
        marginBottom: '15px',
        position: 'relative',
        maxWidth: '55%',
        borderRadius: '20px'
    },
    sender: {
        marginLeft: 'auto',
        backgroundColor: '#448aff'
    },
    messageText: {
        marginLeft: '10px',
        marginRight: '10px',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '5px 10px 5px 10px',
    },
    senderText: {
        backgroundColor: '#448aff'
    },
    username: {
        color: 'white',
        fontSize: '15px',
        marginLeft: '10px'
    }
  }));

function Chat() {
    const classes = useStyles();
    const [sendMessage, setSendMessage] = useState({message: ''})
    const [messages, setMessages] = useState([ ])
    const [ {userData}, dispatch ] = useStateValue()

    useEffect(() => {
        const fetchMessages = () => {
            Axios.get('/api/auth/messages', headers)
            .then(res => {
                setMessages(res.data)
            })
            .catch(err => console.log(err))
        }

        fetchMessages();
    }, []);

    useEffect(() => {
        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;
        const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
            cluster: 'eu',
        });

        const channel = pusher.subscribe('chat');
        channel.bind('event-pusher', data => {
        // alert(JSON.stringify(data));
        const addMsg = {
            id: data.message.id,
            user: data.user,
            message: data.message.message
        }

        setMessages(prevState => [...prevState, addMsg])
        });
    }, [])

    const handleMessage = e => {
        let value = e.target.value;
        setSendMessage({message: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        Axios.post('/api/auth/messages', sendMessage, headers)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        setSendMessage({message: ''})
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Real Time Chat App!</h1>
            <Grid container>
                <Grid item md={2} />
                <Grid item xs={12} md={8}>
                    <div style={{marginBottom: '80px'}}>
                        {
                            messages &&
                            messages.map(message => (
                            <div
                              key={message?.id}
                              className={ `${classes.message} ${userData?.username === message?.user?.username && classes.sender}` }
                            >
                                { userData?.username !== message?.user?.username &&
                                    <Link to={`/profile/${message?.user.id}`}
                                    style={{textDecoration: 'none'}}
                                    >
                                        <p className={classes.username}>{message?.user?.username}</p>
                                    </Link>
                                }
                                <p className={ `${classes.messageText} ${userData?.username === message?.user?.username && classes.senderText}` }>
                                    <strong>{message?.message}</strong>
                                </p>
                            </div>
                            ))
                        }
                    </div>
                </Grid>
                <Grid item md={2} />
            </Grid>

            <div className="chat__textbox">
                <form onSubmit={handleSubmit} noValidate autoComplete="off" >
                    <TextField
                        className="chat__input"
                        type="text"
                        placeholder="send a message"
                        variant="outlined"
                        value={sendMessage.message}
                        onChange={handleMessage}

                    />
                    <Button color="primary" variant="contained" type="submit" className="chat__sendButton">
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Chat
