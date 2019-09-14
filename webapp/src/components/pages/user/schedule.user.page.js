import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import { ScheduleWidget } from '../../widgets'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))

const getEndFromDuration = (start, durationMin) => {
  return new Date(new Date(start).getTime() + durationMin * 60 * 1000)
}

const getEvents = (list = []) => {
  return list.map(item => {
    const {start_time, duration, short_description} = item
    return {
      startDate: start_time,
      endDate: getEndFromDuration(start_time, duration || 10),
      title: short_description || 'Урок'
    }
  })
}

const ScheduleUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getUserLessons()
  }, [store.currentLessons.length])

  return (
    <div className={classes.root}>
      <Paper>
        <ScheduleWidget events={getEvents(store.currentLessons)}/>
      </Paper>
    </div>
  )

}

export default inject('store')(observer(ScheduleUserPage))
