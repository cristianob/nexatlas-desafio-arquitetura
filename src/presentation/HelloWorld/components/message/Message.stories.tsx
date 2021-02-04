import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text} from '@storybook/addon-knobs';

import Message from './Message';

storiesOf('Hello World', module)
  .addDecorator(withKnobs)
  .add('example', () => (
    <Message message={text('Label', 'Hello Storybook!')} />
  ));
