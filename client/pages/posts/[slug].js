import React from 'react'

import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { SINGLE_POST_QUERY } from '../../lib/queries/posts/singlePostQuery'
import Page from '../../components/Page'
import SEO from '../../components/SEO'

const PostPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { slug }
  })

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <p>Coś poszło nie tak...</p>
      </div>
    )
  }

  const post = data && data.allPosts[0]

  return (
    <section aria-label='post-page' style={{ flexGrow: 1, padding: '15px' }}>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.cover_url}
      />
      <Page post={post} loading={loading} />
    </section>
  )
}

export default PostPage
