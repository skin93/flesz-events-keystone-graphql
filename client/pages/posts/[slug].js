import React from 'react'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { SINGLE_POST_QUERY } from '../../lib/queries/posts/singlePostQuery'

const PostPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { slug }
  })

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <Error message='Can not fetch data' />
  }

  return <article>{JSON.stringify(data)}</article>
}

export default PostPage
