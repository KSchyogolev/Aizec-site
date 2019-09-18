import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OfferEditForm, CourseEditForm } from '../forms'
import { inject, observer } from 'mobx-react'
import { TransferListInput } from '../inputs'
import { tableLocalization } from '../../config/config'
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
import { tableIcons } from '../../config/config'
import MaterialTable from 'material-table'
const moment = require('moment')

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  typeSelect: {
    display: 'flex',
    width: 250,
    margin: 'auto',
    marginBottom: '16px'
  },
  emptyType: {
    height: 400
  },
  messageEditBody: {
    height: 400
  }
}))

const UserInfoDialog = ({handleClose, open, user = {}, store}) => {
  const classes = useStyles()

  useEffect(() => {
    store.getUserObjects('groups', user.id, 'currentGroups')
    store.getUserObjects('courses', user.id, 'currentCourses')
    store.getUserObjects('clubs', user.id, 'currentClubs')
  }, [user.id])

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'lg'}>
      <DialogTitle id="form-dialog-title">
        {user.second_name} {user.first_name} {user.third_name}
      </DialogTitle>
      <DialogContent dividers>
        <MaterialTable
          title="Группы"
          icons={tableIcons}
          columns={[
            {title: 'Название', field: 'name', filtering: false},
            {title: 'Дата создания', field: 'first_name', filtering: false, render: rowData => <div>{moment(rowData.created_at).format('DD.MM.YYYY HH:mm')}</div>},
          ]}
          data={store.currentGroups}
          options={{
            pageSize: 5,
            pageSizeOptions: [5, 10],
            actionsColumnIndex: -1
          }}
          localization={tableLocalization}
        />
        <br/>
        <MaterialTable
          title="Курсы"
          icons={tableIcons}
          columns={[
            {title: 'Название', field: 'short_description', filtering: false},
            {
              title: 'Тип',
              field: 'kind',
              lookup: {'intensive': 'Интенсивный', 'regular': 'Регулярный', 'individual': 'Индивидуальный'}
            },
            {title: 'Дата создания', field: 'first_name', filtering: false, render: rowData => <div>{moment(rowData.start_time).format('DD.MM.YYYY HH:mm')}</div>},
          ]}
          data={store.currentCourses}
          options={{
            pageSize: 5,
            pageSizeOptions: [5, 10],
            actionsColumnIndex: -1
          }}
          localization={tableLocalization}
        />
        <br/>
        <MaterialTable
          title='Клубы'
          icons={tableIcons}
          columns={[
            {title: 'Название', field: 'name', filtering: false},
            {title: 'Адрес', field: 'address', filtering: false},
            {title: 'Дата создания', field: 'first_name', filtering: false, render: rowData => <div>{moment(rowData.start_time).format('DD.MM.YYYY HH:mm')}</div>},
          ]}
          data={store.currentClubs}
          options={{
            pageSize: 5,
            pageSizeOptions: [5, 10],
            actionsColumnIndex: -1
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

export default inject('store')(observer(UserInfoDialog))
