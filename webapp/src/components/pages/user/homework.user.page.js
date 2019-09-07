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

/*const lessons = [{
  'id': 10,
  'start_time': null,
  'group_id': null,
  'lesson_info_id': null,
  'status': 'closed',
  'created_at': '2019-07-11T16:42:45.882Z',
  'updated_at': '2019-07-11T16:42:45.882Z',
  'url': 'http://127.0.0.1:3000/lessons/1.json'
}, {
  'id': 2,
  'start_time': '2012-04-23T18:25:43.511Z',
  'group_id': null,
  'lesson_info_id': null,
  'status': 'closed',
  'created_at': '2019-07-11T16:45:19.569Z',
  'updated_at': '2019-07-11T16:45:19.569Z',
  'url': 'http://127.0.0.1:3000/lessons/2.json'
}, {
  'id': 8,
  'start_time': '2019-09-10T14:52:00.000Z',
  'group_id': 2,
  'lesson_info_id': 1,
  'status': 'open',
  'created_at': '2019-09-01T12:52:17.027Z',
  'updated_at': '2019-09-01T12:52:17.027Z',
  'url': 'http://127.0.0.1:3000/lessons/8.json',
  'duration': 123,
  'short_description': 'Первое заняте по Робототехнике',
  'full_description': 'Занятие для очень умных ребят они шарят',
  'course_id': 10,
  'homework': '2132312',
  'synopsys': '21321',
  'lesson_type': 'Роботототехника'
}, {
  'id': 3,
  'start_time': '2019-09-02T15:40:00.000Z',
  'group_id': 9,
  'lesson_info_id': 2,
  'status': 'open',
  'created_at': '2019-09-01T11:53:42.479Z',
  'updated_at': '2019-09-01T13:02:13.229Z',
  'url': 'http://127.0.0.1:3000/lessons/3.json',
  'duration': 33,
  'short_description': 'Второе занятие',
  'full_description': '123',
  'course_id': 8,
  'homework': 'ТЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕСТ',
  'synopsys': 'ыми моделями строения адронов. Середина 1980-х и середина 1990-х ознаменовались бурным развитием теории струн, ожидалось, что в ближайшее время на основе теории струн будет сформулирована так называемая «единая теория», или «теория всего»[4], поискам которой Эйнштейн безуспешно посвятил десятилетия[8]. Но, несмотря на математическую строгость и целостность теории, пока не найдены варианты экспериментального подтверждения теории струн[2]. Возникшая для описания адронной  математических формализмов, в основном — алгебраической и дифференциальной геометрии, топологии, а также позволила глубже понять структуру предшествующих ей теорий квантовой гравитации[2]. Развитие теории струн продолжается, и есть надежда[2], что недостающие элементы струнных теорий и соответствующие феномены будут найдены в ближайшем будущем, в том числе в результате экспериментов на ',
  'lesson_type': 'Роботототехника'
}, {
  'id': 7,
  'start_time': '2019-09-18T12:51:00.000Z',
  'group_id': 8,
  'lesson_info_id': 1,
  'status': 'open',
  'created_at': '2019-09-01T12:51:31.137Z',
  'updated_at': '2019-09-01T13:02:26.587Z',
  'url': 'http://127.0.0.1:3000/lessons/7.json',
  'duration': 123,
  'short_description': 'Первое заняте по Робототехнике',
  'full_description': 'Занятие для очень умных ребят они шарят',
  'course_id': 10,
  'homework': '2132312',
  'synopsys': '21321',
  'lesson_type': 'Роботототехника'
}, {
  'id': 12,
  'start_time': '2019-09-10T12:12:00.000Z',
  'group_id': 9,
  'lesson_info_id': 2,
  'status': 'open',
  'created_at': '2019-09-01T13:20:33.146Z',
  'updated_at': '2019-09-01T13:36:00.779Z',
  'url': 'http://127.0.0.1:3000/lessons/12.json',
  'duration': 33,
  'short_description': 'Второе занятие',
  'full_description': '123',
  'course_id': 8,
  'homework': 'Задача 1. Среднее количество вызовов, поступающих на коммутатор завода в течение часа, равно 300. Оценить вероятность того, что в течение следующего часа число вызовов на коммутатор: а) превысит 400; б) будет не более 500. ',
  'synopsys': 'ыми моделями строения адронов. Середина 1980-х и середина 1990-х ознаменовались бурным развитием теории струн, ожидалось, что в ближайшее время на основе теории струн будет сформулирована так называемая «единая теория», или «теория всего»[4], поискам которой Эйнштейн безуспешно посвятил десятилетия[8]. Но, несмотря на математическую строгость и целостность теории, пока не найдены варианты экспериментального подтверждения теории струн[2]. Возникшая для описания адронной  математических формализмов, в основном — алгебраической и дифференциальной геометрии, топологии, а также позволила глубже понять структуру предшествующих ей теорий квантовой гравитации[2]. Развитие теории струн продолжается, и есть надежда[2], что недостающие элементы струнных теорий и соответствующие феномены будут найдены в ближайшем будущем, в том числе в результате экспериментов на ',
  'lesson_type': 'Роботототехника'
}, {
  'id': 13,
  'start_time': '2019-09-16T13:40:00.000Z',
  'group_id': 3,
  'lesson_info_id': 5,
  'status': 'open',
  'created_at': '2019-09-01T13:40:08.993Z',
  'updated_at': '2019-09-01T15:22:11.804Z',
  'url': 'http://127.0.0.1:3000/lessons/13.json',
  'duration': 3213,
  'short_description': 'Второе занятие по Матеше',
  'full_description': '1231',
  'course_id': 14,
  'homework': null,
  'synopsys': '2321321',
  'lesson_type': 'Матиша'
}, {
  'id': 1220,
  'start_time': '2019-09-16T13:54:00.000Z',
  'group_id': 9,
  'lesson_info_id': 2,
  'status': 'open',
  'created_at': '2019-09-01T12:54:58.724Z',
  'updated_at': '2019-09-05T17:32:02.243Z',
  'url': 'http://127.0.0.1:3000/lessons/10.json',
  'duration': 33,
  'short_description': 'Второе занятие',
  'full_description': '123',
  'course_id': 8,
  'homework': 'Задача 1. Среднее количество вызовов, поступающих на коммутатор завода в течение часа, равно 300. Оценить вероятность того, что в течение следующего часа число вызовов на коммутатор: а) превысит 400; б) будет не более 500. ',
  'synopsys': 'ыми моделями строения адронов. Середина 1980-х и середина 1990-х ознаменовались бурным развитием теории струн, ожидалось, что в ближайшее время на основе теории струн будет сформулирована так называемая «единая теория», или «теория всего»[4], поискам которой Эйнштейн безуспешно посвятил десятилетия[8]. Но, несмотря на математическую строгость и целостность теории, пока не найдены варианты экспериментального подтверждения теории струн[2]. Возникшая для описания адронной  математических формализмов, в основном — алгебраической и дифференциальной геометрии, топологии, а также позволила глубже понять структуру предшествующих ей теорий квантовой гравитации[2]. Развитие теории струн продолжается, и есть надежда[2], что недостающие элементы струнных теорий и соответствующие феномены будут найдены в ближайшем будущем, в том числе в результате экспериментов на ',
  'lesson_type': 'Роботототехника'
}, {
  'id': 5,
  'start_time': '2019-09-10T12:34:00.000Z',
  'group_id': 9,
  'lesson_info_id': 2,
  'status': 'open',
  'created_at': '2019-09-01T12:35:04.124Z',
  'updated_at': '2019-09-05T17:32:05.622Z',
  'url': 'http://127.0.0.1:3000/lessons/5.json',
  'duration': 33,
  'short_description': 'Второе занятие',
  'full_description': '123',
  'course_id': 8,
  'homework': 'Задача 1. Среднее количество вызовов, поступающих на коммутатор завода в течение часа, равно 300. Оценить вероятность того, что в течение следующего часа число вызовов на коммутатор: а) превысит 400; б) будет не более 500. ',
  'synopsys': 'ыми моделями строения адронов. Середина 1980-х и середина 1990-х ознаменовались бурным развитием теории струн, ожидалось, что в ближайшее время на основе теории струн будет сформулирована так называемая «единая теория», или «теория всего»[4], поискам которой Эйнштейн безуспешно посвятил десятилетия[8]. Но, несмотря на математическую строгость и целостность теории, пока не найдены варианты экспериментального подтверждения теории струн[2]. Возникшая для описания адронной  математических формализмов, в основном — алгебраической и дифференциальной геометрии, топологии, а также позволила глубже понять структуру предшествующих ей теорий квантовой гравитации[2]. Развитие теории струн продолжается, и есть надежда[2], что недостающие элементы струнных теорий и соответствующие феномены будут найдены в ближайшем будущем, в том числе в результате экспериментов на ',
  'lesson_type': 'Роботототехника'
}, {
  'id': 14,
  'start_time': '2019-09-12T18:25:00.000Z',
  'group_id': 7,
  'lesson_info_id': 2,
  'status': 'closed',
  'created_at': '2019-09-05T17:32:23.300Z',
  'updated_at': '2019-09-05T17:32:23.300Z',
  'url': 'http://127.0.0.1:3000/lessons/14.json',
  'duration': 33,
  'short_description': 'Второе занятие',
  'full_description': '123',
  'course_id': 8,
  'homework': 'Задача 1. Среднее количество вызовов, поступающих на коммутатор завода в течение часа, равно 300. Оценить вероятность того, что в течение следующего часа число вызовов на коммутатор: а) превысит 400; б) будет не более 500. ',
  'synopsys': 'ыми моделями строения адронов. Середина 1980-х и середина 1990-х ознаменовались бурным развитием теории струн, ожидалось, что в ближайшее время на основе теории струн будет сформулирована так называемая «единая теория», или «теория всего»[4], поискам которой Эйнштейн безуспешно посвятил десятилетия[8]. Но, несмотря на математическую строгость и целостность теории, пока не найдены варианты экспериментального подтверждения теории струн[2]. Возникшая для описания адронной  математических формализмов, в основном — алгебраической и дифференциальной геометрии, топологии, а также позволила глубже понять структуру предшествующих ей теорий квантовой гравитации[2]. Развитие теории струн продолжается, и есть надежда[2], что недостающие элементы струнных теорий и соответствующие феномены будут найдены в ближайшем будущем, в том числе в результате экспериментов на ',
  'lesson_type': 'Роботототехника'
}, {
  'id': 15,
  'start_time': '2019-09-25T17:32:00.000Z',
  'group_id': 3,
  'lesson_info_id': 5,
  'status': 'closed',
  'created_at': '2019-09-05T17:33:05.204Z',
  'updated_at': '2019-09-05T17:33:05.204Z',
  'url': 'http://127.0.0.1:3000/lessons/15.json',
  'duration': 3213,
  'short_description': 'Второе занятие по Матеше',
  'full_description': '1231',
  'course_id': 14,
  'homework': null,
  'synopsys': '2321321',
  'lesson_type': 'Матиша'
}]*/

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
    fontWeight: 600,
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

const HomeworkUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  const openLessons = store.currentLessons.filter(item => item.status === 'open')
  const mapVisitOnLesson = visits.reduce((res, item) => ({...res, [item.lesson_id]: {...item}}), {})

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
        title="Доступные уроки"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Полное описание', field: 'full_description', filtering: false},
          {
            title: 'Статус', render: props => {
            const visit = mapVisitOnLesson[props.id] || {}
            return <div className={classes.statusIcons}>
              {getIconByStatus(visit.approve_status)}
            </div>
          }, filtering: false
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
                    <div>
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
          pageSizeOptions: [10, 20, 50]
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
