import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'

const CoursePayDialog = ({open, handleClose, handleSave, ...props}) => {

  const [payment, setPayment] = useState('')

  const {store} = props

  const handleChangePayment = (e) => {
    setPayment(e.target.value)
  }

  const onApply = () => {
    handleSave(payment)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">Добавить платеж</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="payment"
          label="Сумма"
          fullWidth
          style={{width: '400px'}}
          type="number"
          onChange={handleChangePayment}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onApply} color="primary">
          ОК
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(CoursePayDialog))
