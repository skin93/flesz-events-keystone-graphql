import { gql } from 'graphql-request'
export const ALL_PREVIEW_POSTS_QUERY = gql`
  query {
    allPosts(where: { status: DRAFT }) {
      id
    }
  }
`
