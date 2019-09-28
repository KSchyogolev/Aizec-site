import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { MessageDialog, FileUploadDialog } from '../dialogs/'
import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CollectionsIcon from '@material-ui/icons/Collections'

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

const OffersPage = props => {
  const [messageDialogIsOpen, setMessageDialogVisible] = useState(false)
  const [uploadDialogIsOpen, setUploadDialogVisible] = useState(false)
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
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Тип</TableCell>
              <TableCell align="left">Заголовок</TableCell>
              <TableCell align="left">Текст</TableCell>
              <TableCell align="left">Цена</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.messages && store.messages.filter(item => item.kind === 'offer' || item.kind === 'merch').map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{messageKinds[row.kind]}</TableCell>
                <TableCell align="left">{row.head_text}</TableCell>
                <TableCell align="left">{row.full_text}</TableCell>
                <TableCell align="left">{row.cost}</TableCell>
                <TableCell align="right" className={classes.actionCell}>
                  <IconButton aria-label="edit" className={classes.margin} onClick={() => openUploadDialog(row)}>
                    <CollectionsIcon fontSize="small"/>
                  </IconButton>
                  <IconButton aria-label="edit" className={classes.margin} onClick={() => openMessageDialog(row)}>
                    <EditIcon fontSize="small"/>
                  </IconButton>
                  <IconButton aria-label="delete" className={classes.margin}
                              onClick={() => {store.deleteMessage(row.id)}}>
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MessageDialog handleClose={closeMessageDialog} handleSave={saveMessage} message={currentMessage}
                     handleChange={handleChange}
                     open={messageDialogIsOpen}
                     types={['offer', 'merch']}/>

      <FileUploadDialog handleClose={closeUploadDialog} message={currentMessage}
                        label={`Загрузка файлов к "${currentMessage.head_text}"`}
                        open={uploadDialogIsOpen}/>
    </div>
  )

}

export default inject('store')(observer(OffersPage))
