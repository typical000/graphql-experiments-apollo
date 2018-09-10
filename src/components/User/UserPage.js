import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import posed, {PoseGroup} from 'react-pose'
import Actions from './Actions'
import Avatar from '../Avatar'
import Card from '../ui/Card'
import Row from '../ui/Row'
import H1 from '../typography/H1'
import P from '../typography/P'
import injectSheet from '../../utils/jss'

const USER_PHOTOS = [
  'http://bezkota.ru/wp-content/uploads/2016/03/dzhimo-kot-s-samymi-bolshimi-glazami-v-mire-08.jpg',
  'https://fthmb.tqn.com/WhmvoAF-QK7euBc1crnPYh9IlSM=/960x0/filters:no_upscale()/step_4-disease-59b9b6a9d963ac0011faca31-59bae508396e5a0010365c5b.jpg',
  'https://fthmb.tqn.com/XnP6Ci8N-zeKop1cg8K3LzBqz-c=/960x0/filters:no_upscale()/step_3-lucky-59b9b688685fbe0011c6ac78-59bae4f0054ad90011988d89.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg',
  'http://www.strangehistory.net/blog/wp-content/uploads/2011/05/black-cat.jpg',
  'http://www.lifewithcats.tv/wp-content/uploads/2015/11/Black-Cat-random-32500172-1280-1024.jpg',
]

const Content = posed.div({
  enter: {staggerChildren: 50},
  exit: {staggerChildren: 20, staggerDirection: -1},
})

const UserField = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: 50, opacity: 0},
})

const AnimatedPhoto = posed.div({
  enter: {y: 0, opacity: 1},
  exit: {y: 50, opacity: 0},
})

/**
 * @param {number} gender
 */
const getGenderTranslation = (gender) => {
  if (gender === 1) return 'a man'
  return 'a woman'
}

const styles = {
  main: {
    display: 'flex',
  },
  avatar: {
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: 40,
  },
  list: {
    padding: 30,
  },
  photo: {
    width: 177,
    height: 177,
    padding: 5,
    display: 'inline-block',
    verticalAlign: 'top',
  },
}

const UserPage = ({
  classes,
  screenname,
  avatar,
  gender,
  city,
  country,
  actions,
}) => (
  <PoseGroup animateOnMount>
    <Content key={1}>
      <Row>
        <Card>
          <div className={classes.main}>
            <div className={classes.avatar}>
              <Avatar src={avatar} large />
            </div>
            <Content className={classes.content}>
              <UserField>
                <H1>{screenname}</H1>
              </UserField>
              <UserField>
                <P>{`19 years old, ${getGenderTranslation(gender)}`}</P>
              </UserField>
              <UserField>
                <P>{`from ${city}, ${country}`}</P>
              </UserField>
              {actions && (
                <UserField>
                  <Actions actions={actions} />
                </UserField>
              )}
            </Content>
          </div>
        </Card>
      </Row>
      <Row>
        <Card>
          <div className={classes.list}>
            <H1>Member photos</H1>
            <Content>
              {USER_PHOTOS.map((photo) => (
                <AnimatedPhoto className={classes.photo} key={photo}>
                  <Avatar src={photo} />
                </AnimatedPhoto>
              ))}
            </Content>
          </div>
        </Card>
      </Row>
    </Content>
  </PoseGroup>
)

UserPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  screenname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gender: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
}

export default injectSheet(styles)(UserPage)
