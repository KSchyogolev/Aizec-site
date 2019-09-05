import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'

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
    height: '6em'
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
        image={require('../../../static/images/' + (parent.gender ? 'man_card.jpg' : 'woman_card.jpg') )}
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
            <div>Дата рождения</div>
            <div>{parent.birthday}</div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  </Typography>
}

const MainUserPage = (props) => {
  const classes = useStyles()
  const {store} = props
  const {currentUser: user} = store
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
          {user.parents ? <Typography>
            {/*<Typography variant="h5" component="h2">Представители</Typography>*/}
            <Grid container spacing={3}>
              {JSON.parse(user.parents).map(item => <Grid item xs={6} sm={3}>
                <ParentCard parent={item}/>
              </Grid>)}
            </Grid>
          </Typography> : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default inject('store')(observer(MainUserPage))
