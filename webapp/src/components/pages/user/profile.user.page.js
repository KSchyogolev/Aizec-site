import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { getCurrentOffers } from './offers.user.page'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NotifIcon from '@material-ui/icons/PriorityHigh'

const moment = require('moment')

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
  },
  parentsExpand: {
    width: '100%'
  },
  notificationBox: {
    margin: '20px 0',
    textAlign: 'left',
    // backgroundColor: '#ff57221c'
  },
  notification: {
    display: 'flex',
    padding: 15,
    fontWeight: 600,
    '& svg': {
      marginRight: 10
    }
  }
}))

const parentTypes = {
  mother: 'Мать',
  father: 'Отец',
  rustee: 'Опекун'
}

const ParentCard = ({parent, ...props}) => {
  const classes = useStyles()
  return <Typography component='div'>
    <Card>
      <CardMedia
        className={classes.parentMedia}
        image={require('../../../static/images/' + (parent.gender ? 'man_card.jpg' : 'woman_card.jpg'))}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h6">
          {parent.second_name} {parent.first_name} {parent.third_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {parentTypes[parent.relationship]}
        </Typography>
        <Typography component={'div'} className={classes.info}>
          <div className={classes.infoRow}>
            <div>Телефон</div>
            <div>{parent.phone}</div>
          </div>
          <div className={classes.infoRow}>
            <div>Почта</div>
            <div>{parent.email}</div>
          </div>
          <div className={classes.infoRow}>
            <div>Дата рождения</div>
            <div>{moment(parent.birthday).format('DD.MM.YYYY')}</div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  </Typography>
}

const NotificationRow = ({text, priority}) => {
  const classes = useStyles()
  const priorityColor = {
    1: '#FF5722',
    2: '#faaa0c',
    3: '#757575',
  }

  return <div className={classes.notification}><NotifIcon style={{color: priorityColor[priority]}}/>{text}</div>
}

const ProfileUserPage = (props) => {
  const classes = useStyles()
  const {store} = props
  const {currentUser: user} = store

  useEffect(() => {
    store.getCurrentOffers()
    store.getUserObjects('inbox')
  }, [store.currentOffers.length])

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media} s
          image={require('../../../static/images/profile_background_2.jpg')}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {user.second_name} {user.first_name} {user.third_name}
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
              <div>{moment(user.birthday).format('DD.MM.YYYY')}</div>
            </div>
            <div className={classes.infoRow}>
              <div>Клуб</div>
              <div>{user.club || 'Не выбран'}</div>
            </div>
            <div className={classes.infoRow}>
              <div>Уровень знаний</div>
              <div>{user.level || 'Не выбран'}</div>
            </div>
            <div className={classes.infoRow}>
              <div>Бонусы</div>
              <div>{user.bonus_count || 0}</div>
            </div>
          </Typography>
          <Grid container spacing={3}>
            {user.parents.map(item => <Grid item xs={12} sm={12} md={6} lg={6}>
              <ParentCard parent={item}/>
            </Grid>)}
          </Grid>
{/*          {user.parents ? <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Родители</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.parentsExpand}>
              <Grid container spacing={3}>
                {user.parents.map(item => <Grid item xs={12} sm={12} md={6} lg={6}>
                  <ParentCard parent={item}/>
                </Grid>)}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel> : null}*/}
        </CardContent>
      </Card>
      <br/>
    </div>
  )
}

export default inject('store')(observer(ProfileUserPage))
