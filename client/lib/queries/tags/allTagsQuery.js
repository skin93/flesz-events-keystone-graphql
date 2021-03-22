import { gql } from 'graphql-request'
export const ALL_TAGS_QUERY = gql`
  query {
    allTags {
      id
      name
      slug
    }
    _allTagsMeta {
      count
    }
  }
`
