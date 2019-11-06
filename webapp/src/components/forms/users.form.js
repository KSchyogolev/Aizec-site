import React, { useState, useEffect } from 'react'
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
import Grid from '@material-ui/core/Grid'
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
    marginBottom: 10
  },
  checkPicker: {
    padding: '10px 20px 10px 10px',
    background: '#e4e4e4',
    borderRadius: 10
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
  const [currentGroup, setGroup] = useState(null)
  const [filter, setFilter] = useState({
    group: {}
  })

  const groupsItems = [...store.groups.map(item => ({
    label: item.name,
    value: item.id
  })), {label: '- не выбрано -', value: null}]

  const [checkBio, setCheckBio] = useState(false)

  const handleCheckBio = (e) => {
    setCheckBio(e.target.checked)
  }

  const handleChangeFilter = (field) => (e) => {
    setFilter(prev => ({...prev, group: e}))
    if (field === 'group') {
      const group = store.groups.find(item => item.id === e.value)
      setGroup(group)
    }
  }

  const openUserInfoDialog = (user) => {
    setCurrentUser(user)
    setUserDialogVisible(true)
  }
  const closeUserInfoDialog = () => setUserDialogVisible(false)

  return (
    <div className={classes.root}>
      <div className={classes.filterHeader}>
        <Grid container spacing={2}>
          <Grid item lg={2} md={4} xs={12}>
            <FormControlLabel
              className={classes.checkPicker}
              control={
                <Checkbox
                  checked={checkBio}
                  onChange={handleCheckBio}
                  color="secondary"
                />
              }
              label="Показывать только с заметками"
            />
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <MultiSearchInput multi={false} handleChange={handleChangeFilter('group')}
                              values={filter.group} label={'Выберите группу'}
                              items={groupsItems}/>
          </Grid>
        </Grid>
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
        data={store.users.filter(user => user.role === 'user' && user.status === 'active' && (checkBio ? (user.bio && user.bio.length > 0) : true) && (currentGroup ? currentGroup.users.findIndex(item => item.id === user.id) >= 0 : true))}
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
