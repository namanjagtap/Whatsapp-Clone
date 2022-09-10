import React, { useCallback, useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import { useConversations } from "../Contexts/ConversationsProvider"

export default function OpenConversation(){
    const [text, setText] = useState()
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({ smooth: true })
        }
    }, [])
    
    const { sendMessage, selectedConversationIndex } = useConversations()
    
    function handleSubmit(e){
        e.preventDefault()

        sendMessage(selectedConversationIndex.recipients.map(r => r.id), text)
        setText('')
    }

    return(
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversationIndex.messages.map((message, index) => {
                        const lastMessage = selectedConversationIndex.messages.length - 1 === index
                        return(
                            <div
                            ref = {lastMessage ? setRef : null}
                            key={index}
                            className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
                                >
                                    {message.text}
                                </div>
                                <div
                                    className={`text-muted small ${message.fromMe ? 'align-self-end' : ''}`}
                                > 
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                        as="textarea"
                        required
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style={{ height: '50px', resize: 'none'}}
                        />
                        <Button type="submit">Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}