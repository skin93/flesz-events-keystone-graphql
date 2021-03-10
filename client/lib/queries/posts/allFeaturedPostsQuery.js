import { gql } from '@apollo/client'
export const ALL_FEATURED_POSTS_QUERY = gql`
  query AllFeaturedPostsQuery {
    allPosts(where: { AND: [{ isFeatured: true }, { status: PUBLISHED }] }) {
      id
      title
      slug
      cover_url
    }
  }
`
