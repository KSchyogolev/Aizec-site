import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { MultiSearchInput } from '../inputs'
import { UserInfoDialog } from '../dialogs'
import { tableLocalization } from '../../config/config'
import GroupIcon from '@material-ui/icons/Group'
import InfoIcon from '@material-ui/icons/Portrait'
import PhoneIcon from '@material-ui/icons/Phone'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const moment = require('moment')

const parentTypes = {
  mother: 'Мать',
  father: 'Отец',
  rustee: 'Опекун'
}

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  filterHeader: {
    display: 'flex',
    marginBottom : 10
  }
}))

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

const UsersForm = props => {
  const classes = useStyles()
  const {store} = props
  const [userDialogIsOpen, setUserDialogVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [checkBio, setCheckBio] = useState(false)

  const handleCheckBio = (e) => {
    setCheckBio(e.target.checked)
  }


  const openUserInfoDialog = (user) => {
    setCurrentUser(user)
    setUserDialogVisible(true)
  }
  const closeUserInfoDialog = () => setUserDialogVisible(false)

  return (
    <div className={classes.root}>
      <div className={classes.filterHeader}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBio}
              onChange={handleCheckBio}
              color="secondary"
            />
          }
          label="Показывать только с заметками"
        />
      </div>
      <MaterialTable
        title="Ученики"
        icons={tableIcons}
        columns={[
          {
            title: 'ФИО родителей',
            field: 'parents',
            editable: false,
            filtering: false,
            render: rowData => rowData.parents && rowData.parents.map(item => userInfo(item))
          }, {
            title: 'Контакты',
            field: 'contacts',
            editable: false,
            filtering: false,
            render: rowData => rowData.parents && rowData.parents.map(item => userContacts(item))
          },
          {title: 'Фамилия', field: 'second_name', editable: false, filtering: false},
          {title: 'Имя', field: 'first_name', editable: false, filtering: false},
          {title: 'Отчество', field: 'third_name', editable: false, filtering: false},
          {
            title: 'Возраст',
            field: 'third_name',
            filtering: false,
            editable: false,
            render: rowData => <div>{moment().diff(moment(rowData.birthday), 'years')}</div>
          },
          {title: 'Почта аккаунта', field: 'email', filtering: false, editable: false},
          {title: 'Заметка', field: 'bio'}
        ]}
        data={store.users.filter(user => user.role === 'user' && user.status === 'active' && (checkBio ? (user.bio && user.bio.length > 0) : true))}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
        }}
        localization={tableLocalization}
        actions={[
          {
            icon: () => <InfoIcon/>,
            tooltip: 'Информация',
            onClick: (e, rowData) => openUserInfoDialog(rowData)
          }
        ]}
        editable={{
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateUser(oldData.id, newData).then(resolve).catch(reject))
        }}
      />
      <UserInfoDialog handleClose={closeUserInfoDialog} open={userDialogIsOpen} user={currentUser}/>
    </div>
  )
}

export default inject('store')(observer(UsersForm))
