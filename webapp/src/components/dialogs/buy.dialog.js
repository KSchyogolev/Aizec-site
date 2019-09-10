import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'

const BuyDialog = ({open, handleClose, name, cost = 0, merch_id = null, course_id = null, message_id = null, ...props}) => {
  const [bonuses, setBonuses] = useState(0)

  const {store} = props

  const handleChangeBonuses = (e) => {
    setBonuses(e.target.value)
  }

  const handleBuy = () => {
    store.addTo('payments', 'payment', {
      bonuses,
      cost,
      merch_id,
      course_id,
      message_id,
      status: 'ready',
      user_id: store.currentUser.id
    }).then(() => {
      store.showNotification('success', 'Заявка на покупку отправлена')
      handleClose()
    }).catch(err => {
      store.showNotification('error', 'Ошибка при отправке заявки')
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">Заявка на покупку</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы собираетесь прирбрести <b>{name}</b>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="bonuses"
          label="Потратить бонусов"
          type="number"
          fullWidth
          onChange={handleChangeBonuses}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleBuy} color="primary">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(BuyDialog))
