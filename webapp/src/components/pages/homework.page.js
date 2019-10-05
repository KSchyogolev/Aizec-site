import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
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
import NotificationMessage from '../notification.component'
import { HomeworkControlDialog } from '../dialogs'
import { DownloadFilesButton } from '../forms/lessons.form'

const moment = require('moment')

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
      component = <NextWeek style={{color: '#ffc335'}}/>
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

const HomeworkPage = (props) => {
  const classes = useStyles()
  const {store} = props
  const [showControlDialog, setVisibleControlDialog] = useState(false)
  const [lesson, setLesson] = useState({})

  const showDialog = (lesson) => {
    setLesson(lesson)
    setVisibleControlDialog(true)
  }

  const closeDialog = () => {
    setVisibleControlDialog(false)
  }
  const mapLessonsInfos = store.lesson_infos.reduce((res, item) => ({...res, [item.id]: {...item}}), {})
  useEffect(() => {
    store.getAll('lessons')
    store.getAll('lesson_infos')
  }, [])

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Занятия"
        icons={tableIcons}
        columns={[
          {
            title: 'Материалы занятия',
            filtering: false,
            grouping: false,
            render: rowData => {
              const lessonInfo = mapLessonsInfos[rowData.lesson_info_id] || {files: []}
              return <DownloadFilesButton lesson={lessonInfo} disabled={lessonInfo.files.length === 0}/>
            }
          },
          {title: 'Предмет', field: 'lesson_type'},
          {title: 'Название', field: 'short_description'},
          {title: 'Полное описание', field: 'full_description'},
          {
            title: 'Группа', field: 'group',
            filtering: false,
            grouping: false,
            render: rowData => {
              const lessonInfo = rowData && mapLessonsInfos[rowData.lesson_info_id]
              const group = lessonInfo && lessonInfo.groups.find(item => item.id === rowData.group_id)
              return group && group.name
            }
          },
          {
            title: 'Дата урока',
            field: 'start_time',
            type: 'datetime',
            defaultSort: 'asc',
            filtering: false,
            grouping: false,
            render: rowData => <div>{moment(rowData.start_time).format('DD.MM.YYYY HH:mm')}</div>
          }
        ]}
        data={store.lessons}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true,
          // grouping: true
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

export default inject('store')(observer(HomeworkPage))
