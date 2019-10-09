import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import List from './components/List'
import ExpandedList from './components/ExpandedList'

const client = new ApolloClient()

function App () {
  const [expanded, setExpanded] = useState(false)

  return (
    <ApolloProvider client={client}>
      <div>
        {
          expanded ? <ExpandedList /> : <List />
        }
        <button onClick={() => setExpanded(!expanded)}>Change</button>
      </div>
    </ApolloProvider>
  )
}

export default hot(App)
