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

const moment = require('moment')


const parentTypes = {
  mother: 'Мать',
  father: 'Отец',
  rustee: 'Опекун'
}


const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
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

  const openUserInfoDialog = (user) => {
    setCurrentUser(user)
    setUserDialogVisible(true)
  }
  const closeUserInfoDialog = () => setUserDialogVisible(false)

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Ученики"
        icons={tableIcons}
        columns={[
          {
            title: 'ФИО родителей',
            field: 'parents',
            render: rowData => rowData.parents && rowData.parents.map(item => userInfo(item))
          },{
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
        data={store.users.filter(user => user.role === 'user' && user.status === 'active')}
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
        /*        editable={{
                  onRowAdd: newData => new Promise((resolve, reject) => store.addTo('groups', 'group', {...newData}).then(resolve).catch(reject)),
                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('groups', oldData.id, newData).then(resolve).catch(reject)),
                  onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('groups', oldData.id).then(resolve).catch(reject))
                }}*/
      />
      <UserInfoDialog handleClose={closeUserInfoDialog} open={userDialogIsOpen} user={currentUser}/>
    </div>
  )
}

export default inject('store')(observer(UsersForm))
