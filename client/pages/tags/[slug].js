import React from 'react'

import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_BY_TAG_QUERY } from '../../lib/queries/posts/allPostsByTagQuery'
import { SINGLE_TAG_QUERY } from '../../lib/queries/tags/singleTagQuery'

import CategoryTagSlugPage from '../../components/CategoryTagSlugPage'

const TagPage = () => {
  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(6)

  const handleClick = () => {
    setFirst((prev) => prev + 6)
  }

  const router = useRouter()
  const { slug } = router.query

  const res1 = useQuery(ALL_POSTS_BY_TAG_QUERY, {
    variables: { slug, skip, first }
  })
  const res2 = useQuery(SINGLE_TAG_QUERY, { variables: { slug } })

  const loading = res1.loading || res2.loading
  const error = res1.error || res2.error

  const posts = res1.data?.allPosts
  const meta = res1.data?._allPostsMeta
  const tag = res2.data?.allTags[0]

  return (
    <section style={{ padding: '15px' }} aria-label='tag-page'>
      <CategoryTagSlugPage
        loading={loading}
        error={error}
        posts={posts}
        item={tag}
        meta={meta}
        handleClick={handleClick}
      />
    </section>
  )
}

export default TagPage
