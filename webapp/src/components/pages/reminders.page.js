import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { RemindersDialog } from '../dialogs/'
import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { tableIcons, tableLocalization } from '../../config/config'
import AddIcon from '@material-ui/icons/Add'
const moment = require('moment')

const useStyles = makeStyles(theme => ({
  root: {},
  addButton: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  controlHeader: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  actionCell: {
    padding: 0,
    minWidth: 110
  }
}))

const RemindersPage = props => {
  const [messageDialogIsOpen, setMessageDialogVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState({})
  const classes = useStyles()
  const {store} = props

  const messageKinds = {
    offer: 'Предложение'
  }

  useEffect(() => {
    store.getAllMessages()
    store.getAll('courses')
    store.getAll('groups')
    store.getAll('users')
    store.getAll('clubs')
  }, [])

  const saveMessage = () => {
    let savePromise = currentMessage.id ? () => store.updateMessage(currentMessage.id, currentMessage) : () => store.addMessage({...currentMessage})
    savePromise().then(() => {
      closeMessageDialog()
    })
  }

  const handleChange = (name, value) => {
    setCurrentMessage({...currentMessage, [name]: value})
  }

  const openMessageDialog = (message) => {
    setMessageDialogVisible(true)
    setCurrentMessage(message || {})
  }
  const closeMessageDialog = () => setMessageDialogVisible(false)

  return (
    <div className={classes.root}>
      <Typography component='div' className={classes.controlHeader}>
        <Button variant="contained" color="primary" className={classes.addButton} onClick={() => openMessageDialog()}>
          <AddIcon className={classes.leftIcon}/> Добавить напоминание
        </Button>
      </Typography>
      <MaterialTable
        title="Напоминания"
        icons={tableIcons}
        columns={[
          {title: 'Приоритет', field: 'head_text', filtering: false},
          {title: 'Текст', field: 'full_text', filtering: false},
          {
            title: 'Дата создания', field: 'created_at', filtering: false, type: 'datetime',
            render: rowData => <div>{moment(rowData.created_at).format('DD.MM.YYYY HH:mm')}</div>
          }
          // {title: 'Видимость', field: 'entity', filtering: false},
        ]}
        data={store.messages.filter(item => item.kind === 'notification')}
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: 'Редактировать',
            onClick: (event, rowData) => openMessageDialog(rowData)
          }
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
        }}
        localization={tableLocalization}
        editable={{
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteMessage(oldData.id).then(resolve).catch(reject))
        }}
      />
      <RemindersDialog handleClose={closeMessageDialog}
                       handleChange={handleChange}
                       open={messageDialogIsOpen}
                       notification={currentMessage}/>
    </div>
  )

}

export default inject('store')(observer(RemindersPage))
