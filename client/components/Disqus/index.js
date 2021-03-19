import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import { makeStyles } from '@material-ui/core/styles'

const Disqus = ({ post }) => {
  const classes = useStyles()
  const disqusShortname = `${process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}`
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/posts/${post.slug}`,
    identifier: post.id,
    title: post.title
  }
  return (
    <div className={classes.root}>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}
export default Disqus

const useStyles = makeStyles({
  root: {
    margin: '30px 0'
  }
})
