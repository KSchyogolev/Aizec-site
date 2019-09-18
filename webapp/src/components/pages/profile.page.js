import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import store from '../../store'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles(theme => ({
  root: {
    margin: 15
  },
  form: {
    padding: 30
  },
  card: {
    textAlign: 'left',
    color: '#212121'
  },
  media: {
    height: '12em'
  },
  profileTable: {},
  infoRow: {
    display: 'flex',
    padding: 5,
    '& div:first-child': {
      fontWeight: 600,
      width: 200
    },
    '& div:last-child': {
      color: '#607D8B'
      // marginLeft: 'auto'
    }
  },
  info: {
    margin: '30px 0px'
  },
  parentMedia: {
    height: '5em'
  },
  parentsForm: {
    // marginTop: 100
  }
}))

const ProfilePage = (props) => {
  const classes = useStyles()
  const {store} = props
  const {currentUser: user} = store
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media} s
          image={require('../../static/images/profile_background.jpg')}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {user.second_name} {user.first_name}
          </Typography>
          <Divider/>
          <Grid/>
          <Typography component={'div'} className={classes.info}>
            <div className={classes.infoRow}>
              <div>Почта</div>
              <div>{user.email}</div>
            </div>
            <div className={classes.infoRow}>
              <div>Дата рождения</div>
              <div>{user.birthday}</div>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )

}

export default inject('store')(observer(ProfilePage))
