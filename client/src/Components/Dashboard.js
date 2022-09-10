import React from "react"
import Sidebar from "./Sidebar"
import OpenConversation from "./OpenConversation"
import { useConversations } from "../Contexts/ConversationsProvider"

export default function Dashboard({ id }){
    const { selectedConversationIndex } = useConversations()

    return(
        <div className="d-flex" style={{height: '100vh'}}>
            <Sidebar id={id} />
            {selectedConversationIndex && <OpenConversation/>}
        </div>
    )
}