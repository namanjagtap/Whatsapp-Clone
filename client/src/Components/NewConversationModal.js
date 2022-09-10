import React, { useState } from "react"
import { Modal, Form, Button} from "react-bootstrap"
import { useContacts } from "../Contexts/ContactsProvider"
import { useConversations } from "../Contexts/ConversationsProvider"

export default function NewConversationModal({ closeModal }){
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()
    
    function handleSubmit(e){
        e.preventDefault();
        createConversation(selectedContactIds)
        closeModal();
    }
    
    function handleCheckboxChange(contactId){
        setSelectedContactIds(prevSelectedContactsIds => {
            if(prevSelectedContactsIds.includes(contactId)){
                return prevSelectedContactsIds.filter(prevId => {
                    return contactId !== prevId
                })
            }
            else {
                return [...prevSelectedContactsIds, contactId]
            }
        })
    }
    
    return(
        <>
            <Modal.Header closeButton>Create Conversations</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit" onClick={handleSubmit}>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}