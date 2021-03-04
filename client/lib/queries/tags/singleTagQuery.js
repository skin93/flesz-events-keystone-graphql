import { gql } from '@apollo/client'
export const SINGLE_TAG_QUERY = gql`
  query SingleTagQuery($slug: String!) {
    allTags(where: { slug: $slug }) {
      name
      description
    }
  }
`
