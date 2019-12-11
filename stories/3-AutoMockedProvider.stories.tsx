import React from 'react'
import { storiesOf } from '@storybook/react'
import Cards from "../src/Cards"
import AutoMockedProvider from "../src/utils/AutoMockedProvider"

storiesOf('3: Auto Mocked Provider', module)
  .add('default', () => (
    <AutoMockedProvider><Cards /></AutoMockedProvider>
  ))

