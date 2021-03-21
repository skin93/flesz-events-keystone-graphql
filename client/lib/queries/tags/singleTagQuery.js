import { gql } from 'graphql-request'
export const SINGLE_TAG_QUERY = gql`
  query SingleTagQuery($slug: String!) {
    allTags(where: { slug: $slug }) {
      id
      name
      description
    }
  }
`
