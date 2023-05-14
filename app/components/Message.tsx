import { sentMessages } from '@prisma/client'
import React from 'react'

interface MessagesProps {
  message: sentMessages,
  right: boolean
}

const Message: React.FC<MessagesProps> = ({message, right}) => {
  return (
    <div className={right ? 'self-end' : 'self-start'}>{message.body}</div>
  )
}

export default Message