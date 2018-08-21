import cn from 'classnames'
import * as React from 'react'
import injectSheet from '../../utils/jss'

const styles = (theme) => ({
  avatar: {
    alignItems: 'center',
    background: theme.common.border, // TODO: Replace with cardMuted
    borderRadius: theme.common.radius,
    display: 'inline-flex',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  img: {
    display: 'inline-block',
    height: 'auto',
    verticalAlign: 'middle',
    width: '100%',
  },
  // Sizes
  large: {
    height: 240,
    width: 240,
  },
  medium: {
    height: 100,
    width: 100,
  },
  round: {
    borderRadius: 1000,
    overflow: 'hidden',
  },
  small: {
    height: 40,
    width: 40,
  },
})

interface InterfaceClass {
  [key: string]: string
}

interface InterfaceProps {
  classes: InterfaceClass
  medium?: boolean
  large?: boolean
  round?: boolean
  small?: boolean
  src: string
}

const Avatar = ({
  classes,
  src,
  small = false,
  medium = false,
  large = false,
  round = false,
}: InterfaceProps) => {
  const classNames: string = cn(
    classes.avatar,
    round && classes.round,
    small && classes.small,
    medium && classes.medium,
    large && classes.large,
  )

  return (
    <div className={classNames}>
      <img className={classes.img} src={src} role="presentation" />
    </div>
  )
}

export default injectSheet(styles)(Avatar)
