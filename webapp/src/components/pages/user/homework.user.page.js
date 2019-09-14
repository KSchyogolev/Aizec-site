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
    display: 'flex',
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

  useEffect(() => {
    store.getUserLessons()
    store.getUserVisits()
  }, [store.currentVisits.length, store.currentLessons.length])

  const onChangeFileHandler = (e, lessonId) => {
    const files = e.target.files
    if (files.length > 0) {
      store.uploadHomework(files, mapVisitOnLesson[lessonId].id).then(res => {
        store.showNotification('success', 'Домашняя работа успешно загружена')
        // this.setTip('currentVisits', (visit) => visit.approve_status === "null", 'homeworkUser')
      }).catch(e => {
        store.showNotification('error', 'Произошла ошибка при загрузке домашней работы')
      })
    }
  }

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Доступные уроки"
        icons={tableIcons}
        columns={[
          {
            title: 'Предмет', field: 'lesson_type', filtering: true
          },
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Полное описание', field: 'full_description', filtering: false},
          {
            title: 'Дата урока', field: 'full_description', filtering: false,
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
                  <div className={classes.detailsButton}>
                    <input accept="image/*" className={classes.input} id="icon-button-file1" type="file"
                           onChange={(file) => onChangeFileHandler(file, rowData.id)}/>
                    <label htmlFor="icon-button-file1">
                      <Tooltip title="Отправить на проверку" aria-label="add">
                        <Fab size="small" color="primary" className={classes.margin}
                             component={'span'}>
                          <CloudUploadIcon/>
                        </Fab>
                      </Tooltip>
                    </label>
                  </div>
                  <Paper className={classes.text}>{rowData.homework}</Paper>
                </div>
              )
            }
          }
        ]}
        data={openLessons}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          filtering: true
        }}
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
    </div>
  )
}

export default inject('store')(observer(HomeworkUserPage))
