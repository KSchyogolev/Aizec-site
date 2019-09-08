import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OfferEditForm, CourseEditForm } from '../forms'
import { inject, observer } from 'mobx-react'
import { TransferListInput } from '../inputs'
import { MultiSearchInput } from '../inputs'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TeacherIcon from '@material-ui/icons/School'
import AssessmentIcon from '@material-ui/icons/Assessment'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { tableLocalization } from '../../config/config'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import API from '../../api/api'

const moment = require('moment')
const FileDownload = require('js-file-download')

const visits = [{
  id: 24,
  status: 'ok',
  homework_comment: 'a',
  teacher_comment: 'a',
  approve_status: 'done_approved',
  user_id: 33,
  lesson_id: 3
}, {
  id: 2,
  status: 'skip_without_reason ',
  homework_comment: 'b',
  teacher_comment: 'b',
  approve_status: 'done_not_approved',
  user_id: 34,
  lesson_id: 12
}, {
  id: 4,
  status: 'skip_not_approved',
  homework_comment: 'c',
  teacher_comment: 'c',
  approve_status: 'need_fix',
  user_id: 35,
  lesson_id: 10
}, {
  id: 3,
  status: 'skip_approved',
  homework_comment: 'd',
  teacher_comment: 'd',
  approve_status: null,
  user_id: 38,
  lesson_id: 5
}]

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  lessonsBody: {
    padding: 0
  },
  blue: {
    color: '#507ab4'
  }
}))

let url = '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBPUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e38d046cd74291d834457fe2a42a22267877e271/31f70d33-7e12-447f-b86b-8c0274252cbb.jfif'

const HomeworkControlDialog = ({handleClose, open, lesson = {}, ...props}) => {
  const classes = useStyles()

  const {store} = props

  const downloadHomework = (visitId) => {
    store.getHomework(visitId).then(() => {
      API.main.downloadFile(url).then(res => {
        FileDownload(res.data, 'homework.jpg')
      })
    })
  }

  const usersMap = store.currentGroup.users && store.currentGroup.users.reduce((res, item) => ({
    ...res,
    [item.id]: `${item.first_name} ${item.second_name} (${item.email})`
  }), {})

  useEffect(() => {
    store.getLessonVisits(lesson.id)
    store.getGroup(lesson.group_id)
  }, [lesson.id])

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">
        Группа
      </DialogTitle>
      <DialogContent dividers className={classes.lessonsBody}>
        <MaterialTable
          title=""
          icons={tableIcons}
          columns={[
            {
              title: 'Ученик',
              render: props => {
                try {
                  return usersMap[props.user_id]
                }
                catch (err) {
                  return ''
                }
              }
            },
            {
              title: 'Домашняя работа',
              field: 'approve_status',
              lookup: {
                'done_not_approved': 'На проверке',
                'done_approved': 'Зачтена',
                'need_fix': 'Не зачтена'
              }
            },
            {
              title: 'Посещение',
              field: 'status',
              lookup: {
                'ok': 'Был на занятии',
                'skip_without_reason ': 'Пропуск без ув.причины',
                'skip_not_approved': 'Прислал справку',
                'skip_approved': 'Пропуск с ув.причиной'
              }
            }
          ]}
          actions={[
            rowData => ({
              icon: () => <DownloadIcon className={rowData.approve_status !== null && classes.blue}/>,
              tooltip: 'Скачать ДЗ',
              onClick: (e, rowData) => downloadHomework(rowData.id),
              disabled: rowData.approve_status === null
            })
          ]}
          data={visits /*store.lessonVisits*/}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            actionsColumnIndex: -1
            // filtering: true
          }}
          editable={{
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('visits', oldData.id, newData).then(resolve).catch(reject))
          }}
          localization={tableLocalization}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default inject('store')(observer(HomeworkControlDialog))
