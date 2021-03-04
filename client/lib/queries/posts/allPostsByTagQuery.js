import { gql } from '@apollo/client'
export const ALL_POSTS_BY_TAG_QUERY = gql`
  query AllPostsByTagQuery($slug: String!) {
    allPosts(where: { tags_some: { slug: $slug } }) {
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
