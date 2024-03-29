import { gql } from 'graphql-request'
export const ALL_POSTS_BY_TAG_QUERY = gql`
  query allPostsByTagQuery($slug: String!, $skip: Int!, $first: Int!) {
    allPosts(
      where: { AND: [{ tags_some: { slug: $slug } }, { status: PUBLISHED }] }
      skip: $skip
      first: $first
      sortBy: createdAt_DESC
    ) {
      id
      title
      slug
      cover_url
      category {
        name
      }
      createdAt
    }
    _allPostsMeta(
      where: { AND: [{ tags_some: { slug: $slug } }, { status: PUBLISHED }] }
    ) {
      count
    }
  }
`
