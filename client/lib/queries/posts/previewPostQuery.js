import { gql } from 'graphql-request'
export const PREVIEW_POST_QUERY = gql`
  query previewPostQuery($id: ID!) {
    allPosts(where: { AND: [{ id: $id }, { status: DRAFT }] }) {
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
