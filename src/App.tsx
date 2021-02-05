import React from 'react'
import Message from '@/presentation/HelloWorld/components/message/Message'

const STORYBOOK_START = false

const App: React.FC = () => {
  return (
    <>
      <Message message="Hello World!" />
    </>
  )
}

export default STORYBOOK_START ? require('../storybook').default : App
