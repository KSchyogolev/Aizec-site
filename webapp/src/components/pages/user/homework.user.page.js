import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons, tableLocalization } from '../../../config/config'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Fab from '@material-ui/core/Fab'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'
import WorkIcon from '@material-ui/icons/Work'
import NextWeek from '@material-ui/icons/NextWeek'
import WorkOff from '@material-ui/icons/WorkOff'
import WarningIcon from '@material-ui/icons/Warning'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import NotificationMessage from '../../notification.component'

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
    // display: 'flex',
    backgroundColor: 'whitesmoke'
  },
  statusIcons: {
    // color: 'green'
  },
  text: {
    padding: 10,
    marginLeft: 10,
    margin: 'auto 20px'
  },
  detailsButton: {
    margin: 'auto 10px'
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

const homeworkMap = {
  'done_not_approved': 'На проверке',
  'done_approved': 'Зачтена',
  'need_fix': 'Не зачтена',
  'null': 'Не отправлена'
}


const HomeworkUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  const openLessons = store.currentLessons.filter(item => item.status === 'open')
  const mapVisitOnLesson = store.currentVisits.reduce((res, item) => ({...res, [item.lesson_id]: {...item}}), {})

  console.log(mapVisitOnLesson)

  const mapCourses = store.currentCourses.reduce((res, item) => ({...res, [item.id]: {...item}}), {})
  console.log(mapVisitOnLesson)
  const mutableData = openLessons.map(item => {
    const lesson = item
    lesson.course_name = mapCourses[item.course_id].short_description
    return lesson
  })

  useEffect(() => {
    store.getUserLessons()
    store.getUserVisits()
    store.getCurrentCourses()
  }, [store.currentVisits.length, store.currentLessons.length])

  const onChangeFileHandler = visitId => e => {
    const files = e.target.files
    if (files.length > 0) {
      store.uploadHomework(files, visitId).then(res => {
        store.showNotification('success', 'Домашняя работа успешно загружена')
        // this.setTip('currentVisits', (visit) => visit.approve_status === "null", 'homeworkUser')
      }).catch(e => {
        store.showNotification('error', 'Произошла ошибка при загрузке домашней работы')
      })
    }
  }

  const UploadHomeWorkButton = ({uploadFile, disabled}) => {
    const classes = useStyles()
    console.log(uploadFile)
    return <div className={classes.detailsButton}>
      <input accept="image/*" className={classes.input} id="icon-button-file1" type="file"
             onChange={file => uploadFile(file)}/>
      <label htmlFor="icon-button-file1">
        <Tooltip title="Отправить ДЗ на проверку" aria-label="add">
          <Fab size="small" color={disabled ? '' : 'primary'} className={classes.margin}
               disabled={disabled}
               component={'span'}>
            <CloudUploadIcon/>
          </Fab>
        </Tooltip>
      </label>
    </div>
  }


  return (
    <div className={classes.root}>
      <MaterialTable
        title="Занятия"
        icons={tableIcons}
        columns={[
          {
            title: '',
            filtering: false,
            grouping: false,
            render: rowData => {
              const visit = mapVisitOnLesson[rowData.id] || {}
              return <UploadHomeWorkButton disabled={visit.approve_status === 'done_approved'} uploadFile={onChangeFileHandler(visit.id)}/>
            }
          },
          {
            title: 'Курс',
            field: 'course_name',
            filtering: false,
            defaultGroupOrder: 0
            // render: rowData => mapCourses[rowData.course_id] && mapCourses[rowData.course_id].short_description
          },
          {
            title: 'Предмет', field: 'lesson_type', filtering: true
          },
          {title: 'Название', field: 'short_description', filtering: false, grouping: false},
          {title: 'Полное описание', field: 'full_description', filtering: false, grouping: false},
          {
            title: 'Дата урока', field: 'full_description', filtering: false, grouping: false,
            type: 'datetime',
            render: rowData => <div>{moment(rowData.start_time).format('DD.MM.YYYY HH:mm')}</div>
          },
          {
            title: 'Статус',
            render: props => {
              const visit = mapVisitOnLesson[props.id] || {}
              return <div className={classes.statusIcons}>
                {getIconByStatus(visit.approve_status)}
              </div>
            },
            lookup: homeworkMap,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(mapVisitOnLesson[rowData.id].approve_status) !== -1
          }
        ]}
        detailPanel={[
          {
            tooltip: 'Подробнее',
            render: rowData => {
              const visit = mapVisitOnLesson[rowData.id] || {}
              return (
                <div className={classes.description}>
                  <Paper className={classes.text}>
                    <h3>Домашнее задание:</h3>
                    {rowData.homework}
                    {visit.homework_comment && <div>
                      <h4>Комментарий от учителя:</h4>
                      {visit.homework_comment}
                    </div>}
                    <br/>
                  </Paper>
                  <br/>
                  <Paper className={classes.text}>
                    <h3>Конспект:</h3>
                    {rowData.synopsys}
                  </Paper>
                </div>
              )
            }
          }
        ]}
        data={mutableData}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          filtering: true,
          grouping: true
          /*  rowStyle: rowData => rowData.status !=='open' && ({
              background: '#f5f2f9',
              // cursorEvents: 'none'
            })*/
        }}
        localization={tableLocalization}
      />
    </div>
  )
}

export default inject('store')(observer(HomeworkUserPage))
