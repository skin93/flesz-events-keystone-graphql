import { gql } from 'graphql-request'
export const SEARCH_TAG_QUERY = gql`
  query SearchTagQuery($input: String!) {
    allTags(search: $input) {
      id
      name
      slug
    }
  }
`
