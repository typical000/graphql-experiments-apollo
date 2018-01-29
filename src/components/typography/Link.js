import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {scale} from 'css-functions'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'

const styles = theme => ({
  link: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.text.highlight,
    '&:hover $bar': {
      transform: scale(1, 1),
    },
  },
  bar: {
    background: theme.text.highlight,
    height: 3,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    transition: transition(),
    transform: scale(0, 1),
  },
})

const Link = ({href, target, classes, className, children}) => (
  <a
    className={cn(classes.link, className)}
    href={href}
    target={target}
  >
    <span className={classes.text}>{children}</span>
    <span className={classes.bar} />
  </a>
)

Link.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.string
}

Link.defaultProps = {
  className: '',
  target: '_self',
}

export default injectSheet(styles)(Link)
