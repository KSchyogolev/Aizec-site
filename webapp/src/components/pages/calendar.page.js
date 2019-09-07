import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import { ScheduleWidget } from '../widgets'

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
    const {start_time, lesson_info} = item
    return {
      startDate: start_time,
      endDate: getEndFromDuration(start_time, lesson_info.duration),
      title: lesson_info.short_description
    }
  })
}

const ScheduleUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getAll('lessons')
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
