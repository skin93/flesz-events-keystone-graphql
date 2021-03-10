import { gql } from '@apollo/client'
export const ALL_TAGS_QUERY = gql`
  query AllTagsQuery($skip: Int!, $first: Int!) {
    allTags(skip: $skip, first: $first) {
      id
      name
      slug
    }
    _allTagsMeta {
      count
    }
  }
`
