import React ,{useEffect, useState} from 'react'
import "./Chat.css"
import { useParams } from 'react-router-dom';
import { Avatar,IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import db from "./firebase"
import { useStateValue } from './StateProvider';
import firebase from "firebase";
function Chat() {
    const [input,setInput]=useState("");
    const [seed,setSeed]=useState("");
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('room').doc(roomId).onSnapshot(snapshot=>
               { setRoomName(snapshot.data().name)
            });
            db.collection('room').doc(roomId).collection("messages").orderBy('time','asc').onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            );
        }
    },[roomId]);

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId]);
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log(input);
        db.collection('room').doc(roomId).collection('messages').add({
            name:user.displayName,
            message:input,
            time:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3 className='chat-room-name'>{roomName}</h3>
                    <p> Last Seen{" "}   
                        {new Date(messages[messages.length-1]?.time?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                    <p className={`chat__message ${message.name===user.displayName&&"chat__receiver"}`}>
                        <span className="chat__name ">{message.name}
                            </span>
                            {message.message}
                            <span className="chat__timestamp">
                                {new Date(message.time?.toDate()).toUTCString()}
                            </span>
                        
                    </p>
                ))}
                
            </div>
            <div className="chat__footer">
            <IconButton>
                        <InsertEmoticon/>
                    </IconButton>
                    <form>
                        <input value={input} onChange={(e)=>
                            setInput(e.target.value)}
                            type="text" placeholder="Type a message"/>
                        < button type="submit" onClick={sendMessage}>Send a message </button>
                    </form>
                    <IconButton>
                        <Mic />
                    </IconButton>
            </div>
        </div>
    )
}

export default Chat
