import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { MessageDialog, FileUploadDialog, GroupUsersTeacherDialog } from '../dialogs/'
import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { tableIcons } from '../../config/config'
import { tableLocalization } from '../../config/config'
import EyeIcon from '@material-ui/icons/RemoveRedEye'
import CollectionsIcon from '@material-ui/icons/Collections'
import API from '../../api/api'
import AddIcon from '@material-ui/icons/Add'

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
    minWidth: 140
  }
}))

const OffersForm = props => {
  const [messageDialogIsOpen, setMessageDialogVisible] = useState(false)
  const [uploadDialogIsOpen, setUploadDialogVisible] = useState(false)
  const [usersDialogIsOpen, setUsersDialogVisible] = useState(false)
  const [currentUsers, setCurrentUsers] = useState([])
  const [currentMessage, setCurrentMessage] = useState({})
  const classes = useStyles()
  const {store} = props

  const messageKinds = {
    offer: 'Предложение',
    merch: 'Товар'
  }

  useEffect(() => {
    store.getAllMessages()
    store.getAll('courses')
    store.getAll('groups')
    store.getAll('users')
    store.getAll('clubs')
  }, [])

  const openUsersDialog = (message) => {
    setCurrentMessage(message || {})
    API.main.getMessageUsers(message.id).then(res => {
      setCurrentUsers(res.data)
      setUsersDialogVisible(true)
    }).catch(err => {
      setCurrentUsers(store.users)
      setUsersDialogVisible(true)
    })
  }

  const closeUsersDialog = () => {
    setUsersDialogVisible(false)
  }

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

  const openUploadDialog = (message) => {
    setUploadDialogVisible(true)
    setCurrentMessage(message || {})
  }
  const closeUploadDialog = () => setUploadDialogVisible(false)

  return (
    <div className={classes.root}>
      <Typography component='div' className={classes.controlHeader}>
        <Button variant="contained" color="primary" className={classes.addButton} onClick={() => openMessageDialog()}>
          <AddIcon className={classes.leftIcon}/> Добавить предложение
        </Button>
      </Typography>
      <MaterialTable
        title="Курсы"
        icons={tableIcons}
        columns={[
          {
            title: 'Тип',
            field: 'kind',
            lookup: {'offer': 'Предложение', 'merch': 'Товар'}
          },
          {title: 'Заголовок', field: 'head_text'},
          {title: 'Текст', field: 'full_text', filtering: false},
          {title: 'Цена', field: 'cost', filtering: false}
        ]}
        data={store.messages.filter(item => item.kind === 'offer' || item.kind === 'merch')}
        actions={[
          {
            icon: () => <EyeIcon/>,
            tooltip: 'Список наблюдателей',
            onClick: (event, rowData) => openUsersDialog(rowData),
            // disabled: (data) => console.log(data)
          }, {
            icon: () => <CollectionsIcon/>,
            tooltip: 'Изображения',
            onClick: (event, rowData) => openUploadDialog(rowData)
          },
          {
            icon: tableIcons.Edit,
            tooltip: 'Редактировать',
            onClick: (event, rowData) => openMessageDialog(rowData)
          }
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        editable={{
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteMessage(oldData.id).then(resolve).catch(reject))
        }}
      />
      <MessageDialog handleClose={closeMessageDialog} handleSave={saveMessage} message={currentMessage}
                     handleChange={handleChange}
                     open={messageDialogIsOpen}
                     types={['offer', 'merch']}/>

      <FileUploadDialog handleClose={closeUploadDialog} message={currentMessage}
                        label={`Загрузка файлов к "${currentMessage.head_text}"`}
                        open={uploadDialogIsOpen}/>

      <GroupUsersTeacherDialog handleClose={closeUsersDialog} open={usersDialogIsOpen} users={currentUsers}
                               title={`Предложение "${currentMessage.head_text}"`}/>
    </div>
  )

}

export default inject('store')(observer(OffersForm))
