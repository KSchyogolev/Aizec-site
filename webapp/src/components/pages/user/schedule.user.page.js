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

const testEvents = [{
  created_at: '2019-09-01T13:20:33.146Z',
  group_id: 9,
  id: 12,
  lesson_info_id: 2,
  start_time: '2019-09-14T12:12:00.000Z',
  status: 'open',
  updated_at: '2019-09-01T13:36:00.779Z',
  url: 'http://127.0.0.1:3000/lessons/12.json'
}, {
  created_at: '2019-09-01T12:35:04.124Z',
  group_id: 9,
  id: 5,
  lesson_info_id: 2,
  start_time: '2019-09-10T12:34:00.000Z',
  status: 'open',
  updated_at: '2019-09-01T13:02:43.988Z',
  url: 'http://127.0.0.1:3000/lessons/5.json'
}]

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
