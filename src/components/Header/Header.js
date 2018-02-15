import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import {LinkButton} from '../ui/Button'
import LogoutButton from '../../containers/Logout'
import Avatar from '../Avatar'

const styles = (theme) => ({
  header: {
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    background: theme.common.header,
    color: theme.text.inverse,
    boxShadow: theme.shadow.level2,
    boxSizing: 'border-box',
    height: 60,
    padding: [10, 20],
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    textAlign: 'left',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  screenname: {
    textTransform: 'none',
    fontWeight: 'bold',
    marginRight: 10,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
    '&:first-child': {
      marginLeft: 0,
      marginRight: 20,
    },
  },
  action: {
    marginLeft: 10,
    '&:first-child': {
      marginLeft: 0,
    },
  },
})

const Header = ({children, classes, user}) => {
  if (user) {
    return (
      <div className={classes.header}>
        <div className={classes.container}>
          <div className={classes.actions}>
            <div className={classes.action}>
              <LinkButton to={'/'}>Search</LinkButton>
            </div>
            <div className={classes.action}>
              <LinkButton to={'/feedback'}>Feedback</LinkButton>
            </div>
          </div>
          <div className={classes.content}>{children}</div>
          {/* This piece of code can be moved in separated component */}
          <div className={classes.user}>
            <div className={classes.screenname}>{user.screenname}</div>
            <Avatar src={user.avatar} small round />
          </div>
          <div className={classes.actions}>
            <LogoutButton />
          </div>
        </div>
      </div>
    )
  }

  return <div className={classes.header}>{children}</div>
}

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  /**
   * TODO: eslint discourages usage of PropTypes.object
   * Try to use graphlq-anywhere - propType()
   *
   * Docs: https://github.com/apollographql/apollo-client/tree/master/packages/graphql-anywhere
   * Example: https://gist.github.com/stubailo/d7e0171d188c89c2c540a59a2e2a7871
   * But we need to set this queries in some place, and after, include in modules.
   */
  user: PropTypes.object, // eslint-disable-line
}

Header.defaultProps = {
  user: null,
}

export default injectSheet(styles)(Header)
