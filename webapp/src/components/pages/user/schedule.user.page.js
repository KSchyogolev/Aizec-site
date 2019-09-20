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

const ScheduleUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  const mapVisitOnLesson = store.currentVisits.reduce((res, item) => ({...res, [item.lesson_id]: {...item}}), {})
  const mapCourses = store.currentCourses.reduce((res, item) => ({...res, [item.id]: {...item}}), {})

  const getEvents = (list = []) => {
    return list.map(item => {
      const {start_time, duration, short_description, course_id, id, status} = item
      return {
        startDate: start_time,
        endDate: getEndFromDuration(start_time, duration || 10),
        title: short_description || 'Урок',
        course: mapCourses[course_id],
        visit: mapVisitOnLesson[id],
        status: status
      }
    })
  }

  useEffect(() => {
    store.getUserLessons()
    store.getUserVisits()
    store.getCurrentCourses()
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
