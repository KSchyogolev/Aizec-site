import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../../config/config'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Fab from '@material-ui/core/Fab'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'
import WorkIcon from '@material-ui/icons/Work'
import NextWeek from '@material-ui/icons/NextWeek'
import WorkOff from '@material-ui/icons/WorkOff'
import WarningIcon from '@material-ui/icons/Warning'
import AssignmentIcon from '@material-ui/icons/Assignment'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import NotificationMessage from '../../notification.component'
import { HomeworkControlDialog } from '../../dialogs'
const moment = require('moment')

const visits = [{
  id: 24,
  status: 'done_not_approved',
  homework_comment: 'a',
  teacher_comment: 'a',
  approve_status: null,
  user_id: 34,
  lesson_id: 3
}, {
  id: 2,
  status: 'done_approved',
  homework_comment: 'b',
  teacher_comment: 'b',
  approve_status: null,
  user_id: 34,
  lesson_id: 12
}, {
  id: 4,
  status: 'need_fix',
  homework_comment: 'c',
  teacher_comment: 'c',
  approve_status: null,
  user_id: 34,
  lesson_id: 10
}, {
  id: 3,
  status: null,
  homework_comment: 'd',
  teacher_comment: 'd',
  approve_status: null,
  user_id: 34,
  lesson_id: 5
}, {
  id: 6,
  status: 'done_approved',
  homework_comment: 'e',
  teacher_comment: 'e',
  approve_status: null,
  user_id: 34,
  lesson_id: 7
}]

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  description: {
    fontStyle: 'italic',
    padding: 10,
    display: 'flex',
    // border: '1px solid #b9b9b9'
    backgroundColor: 'whitesmoke'
  },
  text: {
    margin: 'auto 20px'
  },
  error: {
    color: 'red'
  },
  success: {
    color: 'green'
  },
  waiting: {
    color: 'yellow'
  },
  statusIcons: {
    // color: 'green'
  },
  text: {
    padding: 10,
    marginLeft: 10
  },
  blue: {
    color: '#507ab4'
  }
}))

const getHomeWorkStatus = {
  done_not_approved: 'waiting',
  done_approved: 'success',
  need_fix: 'error'
}

const getIconByStatus = (status) => {

  let component = <WarningIcon/>,
    title = ''

  switch (status) {
    case 'done_not_approved':
      component = <NextWeek style={{color: '#668bc5'}}/>
      title = 'Домашняя работа проверяется преподавателем'
      break
    case 'done_approved':
      component = <WorkIcon style={{color: '#73c56e'}}/>
      title = 'Домашняя работа выполнена успешно'
      break
    case 'need_fix':
      component = <WorkOff style={{color: '#c54436'}}/>
      title = 'Домашняя работа содержит ошибки'
      break
    default :
      component = <WarningIcon style={{color: '#757575'}}/>
      title = 'Домашняя работа не отправлена'
      break
  }

  return <Tooltip title={title} aria-label="icon">
    {component}
  </Tooltip>
}

const HomeworkTeacherPage = (props) => {
  const classes = useStyles()
  const {store} = props
  const [showControlDialog, setVisibleControlDialog] = useState(false)
  const [lesson, setLesson] = useState({})
  // const [visits, setVisists] = useState([])


  // const openLessons = store.currentLessons.filter(item => item.status === 'open')
  const mapVisitOnLesson = visits.reduce((res, item) => ({...res, [item.lesson_id]: {...item}}), {})

  const showDialog = (lesson) => {
    setLesson(lesson)
    setVisibleControlDialog(true)
  }

  const closeDialog = () => {
    setVisibleControlDialog(false)
  }

  useEffect(() => {
    store.getUserLessons()
    store.getUserVisits()
  }, [store.currentVisits.length, store.currentLessons.length])

  const onChangeFileHandler = (e, lessonId) => {
    const files = e.target.files

    store.uploadHomework(files, mapVisitOnLesson[lessonId].id).then(res => {
      store.showNotification('success', 'Домашняя работа успешно загружена')
    }).catch(e => {
      store.showNotification('error', 'Произошла ошибка при загрузке домашней работы')
    })
  }

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Занятия"
        icons={tableIcons}
        columns={[
          {
            title: 'Дата и время',
            field: 'start_time',
            type: 'datetime',
            render: rowData => <div>{moment(rowData.start_time).format('DD.MM.YYYY HH:mm')}</div>
          },
          {title: 'Предмет', field: 'lesson_type', filtering: false},
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Полное описание', field: 'full_description', filtering: false},
        ]}
        detailPanel={[
          {
            tooltip: 'Констпект',
            render: rowData => {
              return (
                <div className={classes.description}>
                  <Paper className={classes.text}>
                    {rowData.synopsys}
                  </Paper>
                </div>
              )
            }
          },
          {
            icon: () => <WorkOutlineIcon/>,
            openIcon: () => <WorkIcon/>,
            tooltip: 'Домашняя работа',
            render: rowData => {
              return (
                <div className={classes.description}>
                  <Paper className={classes.text}>{rowData.homework}</Paper>
                </div>
              )
            }
          }
        ]}
        data={store.currentLessons}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => <AssignmentIcon className={classes.blue}/>,
            tooltip: 'Проверка ДЗ',
            onClick: (e, rowData) => showDialog(rowData)
          }
        ]}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} из {count}',
            labelRowsSelect: 'строк'
          },
          header: {
            actions: ''
          },
          body: {
            emptyDataSourceMessage: 'Нет записей',
            filterRow: {
              filterTooltip: 'Филтр'
            }
          },
          toolbar: {
            searchTooltip: 'Поиск',
            searchPlaceholder: 'Поиск'
          }
        }}
      />
      <HomeworkControlDialog handleClose={closeDialog} open={showControlDialog} lesson={lesson}/>
    </div>
  )
}

export default inject('store')(observer(HomeworkTeacherPage))
