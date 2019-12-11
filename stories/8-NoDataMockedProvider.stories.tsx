import React from 'react'
import { storiesOf } from '@storybook/react'
import Cards from '../src/Cards'
import Episodes from '../src/Episodes'
import NoDataMockedProvider from '../src/utils/NoDataMockedProvider'

storiesOf('8: NoDataMockedProvider', module)
  .add('default', () => (
    <NoDataMockedProvider><Cards /></NoDataMockedProvider>
  ))