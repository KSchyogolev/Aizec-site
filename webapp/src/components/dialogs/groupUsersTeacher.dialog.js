import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { MultiSearchInput } from '../inputs'
import { UserInfoDialog } from '../dialogs'
import { tableLocalization } from '../../config/config'
import GroupIcon from '@material-ui/icons/Group'
import InfoIcon from '@material-ui/icons/PermDeviceInformation'
import PhoneIcon from '@material-ui/icons/Phone'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

const moment = require('moment')

const parentTypes = {
  mother: 'Мать',
  father: 'Отец',
  rustee: 'Опекун'
}

const label = {
  club_id: 'Клуб',
  course_id: 'Курс'
}

const userInfo = (user) => {
  return <div>
    {user.second_name} {user.first_name} {user.third_name} &nbsp;&nbsp;
  </div>
}

const userContacts = user => {
  return <div>
    {user.phone} {user.email} {/* ({parentTypes[user.relationship]}) ({user.gender ? 'М' : 'Ж'})*/}
  </div>
}

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

const GroupUsersTeacherDialog = ({handleClose, open, title = '', users = [], store}) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'lg'}>
      <DialogTitle id="form-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <MaterialTable
          title="Ученики"
          icons={tableIcons}
          columns={[
            {
              title: 'ФИО родителей',
              field: 'parents',
              render: rowData => rowData.parents && rowData.parents.map(item => userInfo(item))
            }, {
              title: 'Контакты',
              field: 'contacts',
              render: rowData => rowData.parents && rowData.parents.map(item => userContacts(item))
            },
            {title: 'Фамилия', field: 'second_name', filtering: false},
            {title: 'Имя', field: 'first_name', filtering: false},
            {title: 'Отчество', field: 'third_name', filtering: false},
            {
              title: 'Возраст',
              field: 'third_name',
              filtering: false,
              render: rowData => <div>{moment().diff(moment(rowData.birthday), 'years')}</div>
            },
            {title: 'Почта аккаунта', field: 'email', filtering: false}
          ]}
          data={users.filter(user => user.role === 'user')}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
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

export default inject('store')(observer(GroupUsersTeacherDialog))
