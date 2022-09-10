import React from "react"
import Logic from "../Components/Login"
import useLocalStorage from "../hooks/useLocalStorage"
import Dashboard from "./Dashboard"
import { ContactsProvider } from "../Contexts/ContactsProvider"
import { ConversationsProvider } from "../Contexts/ConversationsProvider"
import { SocketProvider } from "../Contexts/SocketProvider"

export default function App(){

    const [id, setId] = useLocalStorage('id')
    
    const dashboard = (
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                    <Dashboard id={id}/>
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    )
    
    return (
        <>
            {id ? dashboard : <Logic onIdSubmit={setId} />}
            
        </>
    )
}