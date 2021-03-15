import { gql } from '@apollo/client'
export const ALL_FEATURED_POSTS_QUERY = gql`
  query AllFeaturedPostsQuery {
    allPosts(
      where: { AND: [{ isFeatured: true }, { status: PUBLISHED }] }
      sortBy: createdAt_DESC
    ) {
      id
      title
      slug
      cover_url
    }
  }
`
