import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    height: 300,
    [theme.breakpoints.down('md')]: {
      height: 400
    },
    position: `relative`
  },
  actionsArea: {
    height: `100%`
  },
  chip: {
    position: `absolute`,
    top: 0,
    left: 0,
    fontWeight: `bold`,
    textTransform: `uppercase`,
    backgroundColor: theme.palette.accent.main,
    color: `black`,
    borderRadius: `5px 0px 0px 0px`
  },
  media: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  bodyDesktop: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    position: `absolute`,
    bottom: 0,
    left: 0,
    background: `black`,
    width: `100%`,
    height: 100,
    opacity: 0.8
  },
  bodyMobile: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    backgroundColor: theme.palette.background.main,
    width: `100%`,
    height: 200,
    opacity: 0.8
  },
  title: {
    fontWeight: `bold`,
    color: theme.palette.light.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem'
    }
  },
  created: {
    color: theme.palette.accent.main,
    fontWeight: `bold`
  }
}))

const BaseCard = ({ post }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionsArea}>
        <CardMedia
          component='img'
          className={classes.media}
          image={post.cover_url}
          title={post.title}
          alt={post.title}
        />
        <Chip label={post.category.name} className={classes.chip} />
        <Hidden smDown>
          <CardContent className={classes.bodyDesktop}>
            <Typography
              gutterBottom
              variant='subtitle1'
              component='h2'
              className={classes.title}
            >
              {post.title}
            </Typography>
            <Typography
              variant='subtitle2'
              component='p'
              className={classes.created}
            >
              {post.createdAt.split('T')[0]}
            </Typography>
          </CardContent>
        </Hidden>
        <Hidden mdUp>
          <CardContent className={classes.bodyMobile}>
            <Typography
              gutterBottom
              variant='subtitle1'
              component='h2'
              className={classes.title}
            >
              {post.title}
            </Typography>
            <Typography
              variant='subtitle2'
              component='p'
              className={classes.created}
            >
              {post.createdAt.split('T')[0]}
            </Typography>
          </CardContent>
        </Hidden>
      </CardActionArea>
    </Card>
  )
}

export default BaseCard
