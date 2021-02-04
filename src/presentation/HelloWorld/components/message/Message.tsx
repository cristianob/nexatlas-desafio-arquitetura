import React from 'react'
import { Text, View } from 'react-native'

interface MessageProps {
  message: String
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  const { message } = props

  return (
    <View>
      <Text testID="message-text">{message}a</Text>
    </View>
  )
}

export default Message
