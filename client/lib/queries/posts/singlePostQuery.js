import { gql } from '@apollo/client'
export const SINGLE_POST_QUERY = gql`
  query SinglePostQuery($slug: String!) {
    allPosts(where: { slug: $slug }) {
      slug
    }
  }
`
