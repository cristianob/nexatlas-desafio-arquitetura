import React from 'react'
import { render } from '@testing-library/react-native'
import faker from 'faker'

import Message from './Message'

describe('message component', () => {
  it('should render correct message', () => {
    const mockedMessage = faker.lorem.words(5)
    const { getByTestId } = render(<Message message={mockedMessage} />)

    const messageField = getByTestId('message-text')
    expect(messageField.children).toHaveLength(1)
    expect(messageField.children).toContain(mockedMessage)
  })
})
