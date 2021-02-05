import React from 'react'
import { Message } from '@/presentation/components/message'

const STORYBOOK_START = false

const App: React.FC = () => {
  return (
    <>
      <Message message="Hello World!" />
    </>
  )
}

export default STORYBOOK_START ? require('../storybook').default : App
