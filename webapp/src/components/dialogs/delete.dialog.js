import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'

const DeleteDialog = ({open, handleClose, handleDelete, ...props}) => {

  const [comment, setComment] = useState('')

  const {store} = props

  const handleChangeBonuses = (e) => {
    setComment(e.target.value)
  }

  const onDelete = () => {
    handleDelete(comment)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">Удаление пользователя</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Комментарий"
          fullWidth
          style={{width: '400px'}}
          onChange={handleChangeBonuses}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onDelete} color="primary">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(DeleteDialog))
