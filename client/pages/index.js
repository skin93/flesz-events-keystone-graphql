import React from 'react'
import { gql, useQuery } from '@apollo/client'

export const ALL_POSTS_QUERY = gql`
  query {
    allPosts {
      title
      slug
      category {
        name
      }
      createdAt
    }
  }
`

const HomePage = () => {
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Something went wrong</div>
  }
  return <div>{JSON.stringify(data)}</div>
}

export default HomePage
