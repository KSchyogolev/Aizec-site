import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import NewIcon from '@material-ui/icons/FiberNew'

import ApproveUserIcon from '@material-ui/icons/HowToReg'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    margin: '15px'
  },
  actionButton: {
    padding: '0!important'
  }
}))

const getIconByStatus = (status) => {

  let component = <NewIcon/>,
    title = ''

  switch (status) {
    case 'new':
      component = <NewIcon style={{color: '#668bc5'}}/>
      title = 'Пользователь не состоит ни в одной группе'
      break
    default :
      return null
  }

  return <Tooltip title={title} aria-label="icon">
    {component}
  </Tooltip>
}

const UsersMainForm = props => {
  const {store} = props
  const classes = useStyles()

  useEffect(() => {
    store.getUsers()
  }, [])

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Пользователи"
        icons={tableIcons}
        columns={[
          {
            title: '',
            field: 'approve',
            filtering: false,
            cellStyle: {
              width: 40
            },
            render: rowData => rowData.status === 'not_approved' ?
              <IconButton className={classes.actionButton} onClick={() => store.approveUser(rowData.id)}
                          title={'Подтвердить пользователя'}>
                <ApproveUserIcon/>
              </IconButton> : '',
            editComponent: () => null
          },
          {title: 'Имя', field: 'first_name', filtering: false},
          {title: 'Фамилия', field: 'second_name', filtering: false},
          {title: 'Отчество', field: 'third_name', filtering: false},
          {title: 'Пароль', field: 'password', filtering: false},
          {title: 'Почта', field: 'email', filtering: false},
          {
            title: 'Роль',
            field: 'role',
            lookup: {'admin': 'Администратор', 'teacher': 'Учитель', 'user': 'Ученик'}
          },
          {
            title: 'Статус',
            render: props => getIconByStatus((props && props.isNew && props.role !== 'admin') ? 'new' : ''),
            lookup: {
              'new': 'Новый'
            },
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf((rowData.isNew && rowData.role !== 'admin') ? 'new' : '') !== -1,
            editable: false,
            editComponent: () => null
          }
        ]}
        data={store.users}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          pageSizeOptions: [10, 20, 50],
          filtering: true
        }}
        editable={{
          onRowAdd: newData => new Promise((resolve, reject) => {
            if (newData.role === 'user') {
              store.createByEmail(newData).then(resolve).catch(reject)
              return
            }
            store.addUser(newData).then(resolve).catch(reject)
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateUser(oldData.id, newData).then(resolve).catch(reject)),
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteUser(oldData.id).then(resolve).catch(reject))
        }}
      />
    </div>
  )
}

export default inject('store')(observer(UsersMainForm))
