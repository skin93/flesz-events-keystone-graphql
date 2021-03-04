import { gql } from '@apollo/client'
export const ALL_POSTS_BY_CATEGORY_QUERY = gql`
  query allPostsByCategoryQuery($slug: String!) {
    allPosts(where: { category: { slug: $slug } }) {
      title
      slug
      cover_url
      category {
        name
      }
      createdAt
    }
  }
`