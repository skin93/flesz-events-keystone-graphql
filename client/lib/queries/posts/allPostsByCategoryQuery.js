import { gql } from 'graphql-request'
export const ALL_POSTS_BY_CATEGORY_QUERY = gql`
  query allPostsByCategoryQuery($slug: String!, $skip: Int!, $first: Int!) {
    allPosts(
      where: { AND: [{ category: { slug: $slug } }, { status: PUBLISHED }] }
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
      where: { AND: [{ category: { slug: $slug } }, { status: PUBLISHED }] }
    ) {
      count
    }
  }
`
