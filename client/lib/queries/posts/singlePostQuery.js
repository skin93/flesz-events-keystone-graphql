import { gql } from '@apollo/client'
export const SINGLE_POST_QUERY = gql`
  query SinglePostQuery($slug: String!) {
    allPosts(where: { slug: $slug }) {
      title
      excerpt
      body
      cover_url
      cover_src
      category {
        name
        slug
      }
      tags {
        name
        slug
      }
      createdAt
      authors {
        name
      }
    }
  }
`
