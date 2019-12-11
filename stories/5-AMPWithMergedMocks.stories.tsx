import React from 'react'
import { storiesOf } from '@storybook/react'
import Cards from '../src/Cards'
import Episodes from '../src/Episodes'
import AutoMockedProviderMerged from '../src/utils/AutoMockedProviderMerged'

const mockResolvers = {
  Query: () => ({
    episodes: () => ({
      info: () => ({
        count: 20,
      }),
    })
  })
}

storiesOf('5: AMP with merged mocks', module)
  .add('default', () => (
    <AutoMockedProviderMerged mockResolvers={mockResolvers}><Episodes /><Cards /></AutoMockedProviderMerged>
  ))