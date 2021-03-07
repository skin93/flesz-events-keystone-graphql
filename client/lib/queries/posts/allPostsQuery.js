import { gql } from '@apollo/client'
export const ALL_POSTS_QUERY = gql`
  query AllPostsQuery($skip: Int!, $first: Int!) {
    allPosts(where: { status: PUBLISHED }, skip: $skip, first: $first) {
      title
      slug
      cover_url
      category {
        name
        slug
      }
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`
