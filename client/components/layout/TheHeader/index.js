import React from 'react'

import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/Home'

import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import SiteDrawer from '../SiteDrawer'

const navLinks = [
  { title: `newsy`, path: `/newsy` },
  { title: `festiwale`, path: `/festiwale` },
  { title: `koncerty`, path: `/koncerty` }
]

const TheHeader = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Container maxWidth='lg' className={classes.navbarDisplayFlex}>
            <IconButton edge='start' color='inherit' aria-label='home'>
              <Home fontSize='large' />
            </IconButton>
            <Hidden smDown>
              <List
                component='nav'
                aria-labelledby='main navigation'
                className={classes.navDisplayFlex}
              >
                {navLinks.map(({ title, path }) => (
                  <Link href={path} key={title} passHref>
                    <a className={classes.linkText}>
                      <ListItem button>
                        <ListItemText primary={title} />
                      </ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            </Hidden>
            <Hidden mdUp>
              <SiteDrawer navLinks={navLinks} />
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TheHeader

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '400px'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  }
}))
