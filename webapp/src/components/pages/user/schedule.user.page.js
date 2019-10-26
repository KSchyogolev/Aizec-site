import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import { ScheduleWidget } from '../../widgets'

import WorkIcon from '@material-ui/icons/Work'
import NextWeek from '@material-ui/icons/NextWeek'
import WorkOff from '@material-ui/icons/WorkOff'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'
import WarningIcon from '@material-ui/icons/Warning'
import ReceiptIcon from '@material-ui/icons/Receipt'
import moment from 'moment'

const _ = require('lodash')

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  scheduleHeader: {
    display: 'flex',
    marginBottom: 10,
    '& svg': {
      width: 30,
      height: 30
    }
  },
  legendPaper: {
    padding: 10,
    float: 'left'
  },
  legendTitle: {
    background: 'none'
  },
  legendRow: {
    margin: '15px 0',
    display: 'flex',
    '& div': {
      margin: 'auto 5px',
      fontSize: 14
    },
    '& .MuiPaper-root': {
      margin: 'auto 5px',
      padding: '12px 12px'
    }
  }
}))

const lessonType = {
  ok: '#dcffdd',
  skip_without_reason: '#ffdfd3',
  skip_approved: '#fae5ab',
  skip_not_approved: ''
}

const getHomeworkInfo = (status) => {
  switch (status) {
    case 'done_not_approved':
      return {
        title: 'Домашняя работа проверяется преподавателем',
        icon: <NextWeek style={{color: '#ffc335'}}/>
      }
    case 'done_approved':
      return {
        title: 'Домашняя работа выполнена успешно',
        icon: <WorkIcon style={{color: '#73c56e'}}/>
      }
    case 'need_fix':
      return {
        title: 'Домашняя работа содержит ошибки',
        icon: <WorkOff style={{color: '#c54436'}}/>
      }
    default:
      return {
        title: 'Домашняя работа не отправлена',
        icon: <WarningIcon style={{color: '#757575'}}/>
      }
  }
}

const getLessonInfo = (status) => {
  switch (status) {
    case 'ok':
      return {
        title: 'Был на занятии'
      }
    case 'skip_without_reason':
      return {
        title: 'Пропуск без ув. причины'
      }
    case 'skip_approved':
      return {
        title: 'Пропуск по ув. причине'
      }
    case 'skip_not_approved':
      return {
        title: 'Прислал справку',
        icon: <ReceiptIcon style={{color: '#668bc5'}}/>
      }
    default:
      return {
        title: '',
        icon: ''
      }
  }
}

const getEndFromDuration = (start, durationMin) => {
  return new Date(new Date(start).getTime() + durationMin * 60 * 1000)
}

const ScheduleUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  const mapVisitOnLesson = store.currentVisits.reduce((res, item) => ({...res, [item.lesson_id]: {...item}}), {})
  const mapCourses = store.currentCourses.reduce((res, item) => ({...res, [item.id]: {...item}}), {})

  const lessonsNumbers = store.currentLessons.sort((a, b) => moment(a.start_time).unix() - moment(b.start_time).unix())

  const lessonsGroupByCourse = _.groupBy(lessonsNumbers, 'course_id')

  const coursesPaymentsMap = store.currentPayments.filter(item => item.course_id).reduce((res, item) => ({[item.course_id]: item, ...res}), {})

  const getEvents = (list = []) => {
    return list.map(item => {
      const {start_time, duration, short_description, course_id, id, status} = item
      const lessonNumber = lessonsGroupByCourse[course_id].findIndex(item => id === item.id) + 1
      const coursePayment = coursesPaymentsMap[course_id]
      const course = mapCourses[course_id] || {}
      const allMoney = coursePayment.cost || 0 + coursePayment.bonuses || 0
      const lessonsPaid = Math.floor(allMoney / course.cost_month * 4 * course.lessonsWeek)
      return {
        startDate: start_time,
        endDate: getEndFromDuration(start_time, duration || 10),
        title: short_description || 'Урок',
        course: course,
        visit: mapVisitOnLesson[id],
        status: status,
        isPaid: lessonNumber <= lessonsPaid
      }
    })
  }

  const changeVisitStatus = (visitId, status) => {
    store.updateUserVisit(visitId, {status})
  }

  useEffect(() => {
    store.getUserLessons()
    store.getUserVisits()
    store.getUserObjects('payments', 'currentPayments')
    store.getCurrentCourses()
  }, [store.currentLessons.length])

  const LegendTitle = () => {
    return <Paper className={classes.legendPaper}>
      <div className={classes.legendRow}>
        <Paper style={{backgroundColor: lessonType['ok']}}></Paper>
        <div>{getLessonInfo('ok').title}</div>
      </div>
      <div className={classes.legendRow}>
        <Paper style={{backgroundColor: lessonType['skip_without_reason']}}></Paper>
        <div>{getLessonInfo('skip_without_reason').title}</div>
      </div>
      <div className={classes.legendRow}>
        <Paper style={{backgroundColor: lessonType['skip_approved']}}></Paper>
        <div>{getLessonInfo('skip_approved').title}</div>
      </div>
      <div className={classes.legendRow}>
        <Paper style={{backgroundColor: '#e7e7e7'}}></Paper>
        <div>Доступ к материалам закрыт</div>
      </div>
      <div className={classes.legendRow}>
        <div><MoneyOffIcon style={{color: '#c54436'}}/></div>
        <div>Занятие не оплачено</div>
      </div>
      {['done_not_approved', 'done_approved', 'need_fix', 'skip_not_approved'].map(item => <div
        className={classes.legendRow}>
        <div>{getHomeworkInfo(item).icon}</div>
        <div>{getHomeworkInfo(item).title}</div>
      </div>)}

    </Paper>
  }

  return (
    <div className={classes.root}>
      {/*      <div className={classes.scheduleHeader}>
        <Tooltip title={<LegendTitle/>} aria-label="icon" classes={classes.legendTitle}>
          <HelpIcon style={{color: '#757575'}} size={'big'}/>
        </Tooltip>
      </div>*/}
      <Paper>
        <ScheduleWidget events={getEvents(store.currentLessons)}
                        onLoadDocument={(visitId => changeVisitStatus(visitId, 'skip_not_approved'))}/>
      </Paper>
      <br/>
      <LegendTitle/>
    </div>
  )

}

export default inject('store')(observer(ScheduleUserPage))
