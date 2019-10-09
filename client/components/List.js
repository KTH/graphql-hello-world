import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const CANVAS_NAMES = gql`
  {
    modules(courseId: 1) {
      canvasName
    }
  }
`

export default function List () {
  const { loading, error, data } = useQuery(CANVAS_NAMES)

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
          <li>{m.canvasName}</li>
        ))}
      </ul>
    </div>
  )
}
