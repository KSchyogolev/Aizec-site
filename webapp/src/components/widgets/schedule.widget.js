import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ViewState } from '@devexpress/dx-react-scheduler'
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'
import WorkIcon from '@material-ui/icons/Work'
import NextWeek from '@material-ui/icons/NextWeek'
import WorkOff from '@material-ui/icons/WorkOff'
import WarningIcon from '@material-ui/icons/Warning'
import LockIcon from '@material-ui/icons/Lock'

import CheckIcon from '@material-ui/icons/CheckCircle'
import ReceiptIcon from '@material-ui/icons/Receipt'
import ReportIcon from '@material-ui/icons/Error'

const currentDate = new Date()
const locale = 'ru-RUS'

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: 'left'
  },
  media: {
    height: 140
  },
  description: {
    display: 'flex',
    '& div': {
      margin: 'auto',
      marginLeft: 5
    },
    '& svg': {
      margin: 'auto',
      width: '0.8em',
      height: '0.8em',
      marginRight: 2,
      marginLeft: 2
    }
  },
  root: {}
}))

const lessonType = {
  ok: '#dcffdd',
  skip_without_reason: '#ffdfd3',
  skip_approved: '#fae5ab',
  skip_not_approved: ''
}



const getLessonInfo = (status) => {
  switch (status) {
    case 'ok':
      return {
        title: 'Был на занятии',
        // icon: <CheckIcon style={{color: '#73c56e'}}/>
      }
    case 'skip_without_reason':
      return {
        title: 'Пропуск без ув. причины',
        // icon: <ReportIcon style={{color: '#c54436'}}/>
      }
    case 'skip_approved':
      return {
        title: 'Пропуск по ув. причине',
        // icon: <ReportIcon style={{color: '#faaa0c'}}/>
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

const getHomeworkInfo = (status) => {
  switch (status) {
    case 'done_not_approved':
      return {
        title: 'Домашняя работа проверяется преподавателем',
        icon: <NextWeek style={{color: '#668bc5'}}/>
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

const LessonInfo = ({lesson}) => <div>
  {lesson.status === 'closed' && <div><b>ДОСТУП К МАТЕРИАЛАМ ЗАКРЫТ</b></div>}
  <div><b>КУРС </b>"{lesson.course.short_description}"</div>
  <div><b>ЗАНЯТИЕ </b>"{lesson.title}"</div>
  <div>{getLessonInfo(lesson.visit.status).title}</div>
  <div>{getHomeworkInfo(lesson.visit.approve_status).title}</div>
</div>

const Appointment = ({children, style, ...restProps}) => {
  const classes = useStyles()
  const lesson = children[1].props.data
  return <Tooltip title={<LessonInfo lesson={lesson}/>} placement={'top'} aria-label="add">
    <Paper
      style={{
        ...style,
        // border: '1px solid',
        background: lesson.status === 'closed' ? '#e7e7e7' : lessonType[lesson.visit.status],
        // borderColor: lessonType[lesson.course.kind],
        // borderRadius: '8px',
        margin: '5px',
        // fontSize: 'em'
        padding: '3px'
      }}
    >
      <div className={classes.description}>
        <div><b>{moment(lesson.startDate).format('HH:mm')}</b></div>
        {/*{lesson.status === 'closed' && <LockIcon style={{color: '#757575'}}/>}*/}
        {lesson.status !== 'closed' && getLessonInfo(lesson.visit.status).icon}
        {lesson.status !== 'closed' && getHomeworkInfo(lesson.visit.approve_status).icon}
      </div>
    </Paper>
  </Tooltip>
}

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
        <Appointments
          appointmentComponent={Appointment}
        />
        <Toolbar/>
        <DateNavigator/>
      </Scheduler>
    </div>
  )

}

export default (ScheduleWidget)
