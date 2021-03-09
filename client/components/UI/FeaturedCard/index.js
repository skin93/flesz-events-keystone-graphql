import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const FeaturedCard = ({ post }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Box component='div' className={classes.box}>
          <CardMedia
            component='img'
            className={classes.media}
            image={post.cover_url}
            title={post.title}
            alt={post.title}
          />
          <CardContent className={classes.content}>
            <Typography
              gutterBottom
              variant='subtitle2'
              component='h2'
              className={classes.title}
            >
              {post.title}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default FeaturedCard

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 100,
    marginBottom: '10px',
    borderRadius: '10px'
  },
  box: {
    display: 'flex',
    flexDirection: 'row'
  },
  media: {
    height: 100,
    width: 100
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    backgroundColor: theme.palette.background.main
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.light.main,
    margin: 0,
    fontSize: 'calc(12px + .2vw)',
    [theme.breakpoints.up('lg')]: {
      fontSize: '13px'
    }
  }
}))
