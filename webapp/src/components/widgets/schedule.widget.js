import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ViewState } from '@devexpress/dx-react-scheduler'
import moment from 'moment'
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const currentDate = new Date()
const locale = 'ru-RUS'

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: 'left'
  },
  media: {
    height: 140
  },
  root: {}
}))

const ScheduleWidget = ({events}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Scheduler
        locale={locale}
        data={events}
      >
        <ViewState/>
        <MonthView
          firstDayOfWeek={1}/>
        <Appointments/>
        <Toolbar/>
        <DateNavigator/>
      </Scheduler>
    </div>
  )

}

export default (ScheduleWidget)
