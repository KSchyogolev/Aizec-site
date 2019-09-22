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

const UsersArchiveForm = props => {
  const {store} = props
  const classes = useStyles()

  useEffect(() => {
    store.getArchived('users', 'archivedUsers')
  }, [])

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Пользователи"
        icons={tableIcons}
        columns={[
          {title: 'Имя', field: 'first_name', filtering: false},
          {title: 'Фамилия', field: 'second_name', filtering: false},
          {title: 'Отчество', field: 'third_name', filtering: false},
          {title: 'Почта', field: 'email', filtering: false},
          {
            title: 'Роль',
            field: 'role',
            lookup: {'admin': 'Администратор', 'teacher': 'Учитель', 'user': 'Ученик'}
          }
        ]}
        data={store.archivedUsers}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          pageSizeOptions: [10, 20, 50],
          filtering: true
        }}
      />
    </div>
  )
}

export default inject('store')(observer(UsersArchiveForm))
