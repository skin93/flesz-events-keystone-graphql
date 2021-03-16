import React from 'react'

import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { PREVIEW_POST_QUERY } from '../../lib/queries/posts/previewPostQuery'
import Page from '../../components/Page'

const PreviewPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(PREVIEW_POST_QUERY, {
    variables: { id }
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
    <section aria-label='preview-page' style={{ flexGrow: 1, padding: '15px' }}>
      <Page post={post} loading={loading} />
    </section>
  )
}

export default PreviewPage
