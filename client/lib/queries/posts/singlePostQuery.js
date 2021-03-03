import { gql } from '@apollo/client'
export const SINGLE_POST_QUERY = gql`
  query SinglePostQuery($slug: String!) {
    allPosts(where: { slug: $slug }) {
      title
      excerpt
      body
      cover_url
      category {
        name
      }
      tags {
        name
      }
      createdAt
      authors {
        name
      }
    }
  }
`
