import { gql } from '@apollo/client'
export const SINGLE_CATEGORY_QUERY = gql`
  query SingleCategoryQuery($slug: String!) {
    allCategories(where: { slug: $slug }) {
      name
      description
    }
  }
`
