import { gql } from '@apollo/client'
export const ALL_POSTS_QUERY = gql`
  query {
    allPosts {
      title
      slug
      cover_url
      category {
        name
      }
      createdAt
    }
  }
`
