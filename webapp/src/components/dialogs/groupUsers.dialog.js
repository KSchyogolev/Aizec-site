import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OfferEditForm, CourseEditForm } from '../forms'
import { inject, observer } from 'mobx-react'
import { TransferListInput } from '../inputs'

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

const GroupUsersDialog = ({handleClose, open, group, store}) => {
  const classes = useStyles()

  const getUsersList = (items = []) => items.map(item => ({
    id: item.id,
    label: item.first_name + ' ' + item.second_name + '(' + item.email + ')',
    icon: item.role === 'teacher' ? <TeacherIcon/> : null
  }))

  const filterIncluded = (allItems, items) => allItems.filter(item => items.findIndex(grpItem => item.id === grpItem.id) === -1)
  const allUsers = getUsersList(store.users.filter(item => item.role !== 'admin'))
  let leftList = getUsersList(group.users)
  let rightList = filterIncluded(allUsers, leftList)

  const addUser = (id) => store.addUserToGroup(group.id, id)

  const removeUser = (id) => store.removeUserFromGroup(group.id, id)

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">
        Список группы
      </DialogTitle>
      <DialogContent dividers>
        <TransferListInput leftList={leftList}
                           rightList={rightList}
                           handleAdd={addUser} handleRemove={removeUser}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default inject('store')(observer(GroupUsersDialog))
