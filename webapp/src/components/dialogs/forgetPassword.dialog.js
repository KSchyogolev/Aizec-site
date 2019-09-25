import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'

const ForgetPasswordDialog = ({handleClose, open, ...props}) => {
  const [email, setEmail] = useState('')

  const {store} = props

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleApply = () => {
    store.sendNewPassword(email).then(() => {
      store.showNotification('success', 'Новый пароль выслан на указанную почту')
      handleClose()
    }).catch(err => {
      console.log(err)
      store.showNotification('error', 'Ошибка при отправке пароля, проверьте введенные данные')
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">Восстановление пароля</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Введите почту, на которую зарегистрирована учетная запись
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Почта"
          fullWidth
          value={email}
          onChange={handleChangeEmail}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleApply} color="primary">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(ForgetPasswordDialog))
