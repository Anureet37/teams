import React,{useState,useEffect} from 'react'
import SidebarChat from './SidebarChat';
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import './Sidebar.css';
import db from "./firebase";
import { useStateValue } from './StateProvider';

function Sidebar(props) {
    const [rooms,setRooms]=useState([]);
    const[{user},dispatch]=useStateValue();
    useEffect(()=>{
        const unsubscribe=db.collection('room').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })
            ))
        ));
        return ()=>{
            unsubscribe();
        };
    },[])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div>
                    <Avatar src={user?.photoURL}/>
                    <p>{user.displayName}</p>
                </div>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__container">
                    <SearchOutlined/>
                    <input placeholder="Search" type="text"></input>
                </div>
            </div>
            <div className="sidebar__chat">
                <SidebarChat addNewChat/>
                {rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id} 
                    name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
