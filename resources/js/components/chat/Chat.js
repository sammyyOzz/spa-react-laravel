import React, { useState, useEffect } from 'react'
import { headers } from '../Utilities/constants'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import { useStateValue } from '../../StateProvider';
import Pusher from 'pusher-js'

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
        Pusher.logToConsole = true;
        const pusher = new Pusher('eb6042e2dbfb74506ef3', {
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
            <ul>
                {
                    messages &&
                    messages.map(message => (
                    <li key={message?.id}>
                        {message?.message} from <span style={{color: 'yellow'}}>{message?.user?.username}</span>
                    </li>
                    ))
                }
            </ul>

            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" >
                <TextField
                    type="text"
                    placeholder="send a message"
                    variant="outlined"
                    value={sendMessage.message}
                    onChange={handleMessage}
                /> <br/>

                <Button type="submit" variant="contained" color="primary">Send Message</Button>
            </form>
        </div>
    )
}

export default Chat
