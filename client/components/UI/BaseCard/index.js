import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400
  },
  media: {
    height: 200
  },
  body: {
    height: 200,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`
  },
  title: {
    fontWeight: `bold`
  }
})

const BaseCard = ({ post }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          className={classes.media}
          image={post.cover_url}
          title={post.title}
          alt={post.title}
        />
        <CardContent className={classes.body}>
          <Typography
            gutterBottom
            variant='subtitle1'
            component='h2'
            className={classes.title}
          >
            {post.title}
          </Typography>
          <Typography variant='subtitle2' component='p'>
            {post.createdAt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default BaseCard
