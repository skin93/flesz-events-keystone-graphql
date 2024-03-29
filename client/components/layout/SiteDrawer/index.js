import React from 'react'

import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Drawer from '@material-ui/core/Drawer'

const SiteDrawer = ({ navLinks }) => {
  const classes = useStyles()

  const [state, setState] = React.useState({ right: false })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setState({ [anchor]: open })
  }

  const sideDrawerList = (anchor) => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        component='nav'
        aria-labelledby='main navigation'
        className={classes.list}
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
    </div>
  )

  return (
    <>
      <IconButton
        edge='start'
        aria-label='menu'
        onClick={toggleDrawer('right', true)}
      >
        <Menu fontSize='large' style={{ color: `white` }} />
      </IconButton>
      <Drawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {sideDrawerList('right')}
      </Drawer>
    </>
  )
}

export default SiteDrawer

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: theme.palette.light.main
  }
}))
