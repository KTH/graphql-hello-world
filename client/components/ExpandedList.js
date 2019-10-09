import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LADOK_NAMES = gql`
  {
    modules(courseId: 1) {
      canvasName
      ladokName
    }
  }
`

export default function ExpandedList () {
  const { loading, error, data } = useQuery(LADOK_NAMES)

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Error!</div>
    )
  }

  return (
    <div>
      <ul>
        {data.modules.map(m => (
          <li>{m.canvasName} - {m.ladokName}</li>
        ))}
      </ul>
    </div>
  )
}
