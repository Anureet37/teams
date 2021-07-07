import React from 'react'
import './Sidebar.css'
import {Avatar} from "@material-ui/core";
function SidebarChat() {
    const [seed,]
    useEffect{()=>{

    },[]}
    return (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>Rooom message</h2>
                <p> Last msg</p>
            </div>
        </div>
    )
}

export default SidebarChat
