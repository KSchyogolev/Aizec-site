import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'

const BuyDialog = ({open, handleClose, name, cost = 0, merch_id = null, course_id = null, message_id = null, ...props}) => {
  const [bonuses, setBonuses] = useState(0)

  const {store} = props

  const getBonusesOptions = (count, step) => {
    let options = [0]
    let i = step
    while (i <= count) {
      options.push(i)
      i += step
    }
    return options
  }

  const handleChangeBonuses = (e) => {
    setBonuses(e.target.value)
  }

  const handleBuy = () => {
    store.addTo('payments', 'payment', {
      bonuses,
      cost: course_id ? 0 : cost,
      merch_id,
      course_id,
      message_id,
      status: 'ready',
      user_id: store.currentUser.id
    }).then(() => {
      store.setCurrentBonuses(store.currentUser.bonus_count - bonuses)
      const offerId = merch_id || course_id || message_id
      const offer = {...store.currentOffers.find(item => item.id === offerId)}
      offer.status = 'ready'
      store.updateInStore('currentOffers', offerId, offer)
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
          <div>Вы собираетесь приобрести <b>{name}</b></div>
          <div>У вас <b style={{color: '#FF5722'}}>{store.currentUser.bonus_count || 0}</b> бонусов</div>
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel htmlFor="parent_relationship">Потратить</InputLabel>
          <Select
            inputProps={{
              name: 'head_text',
              id: 'head_text',
              value: bonuses,
              onChange: handleChangeBonuses
            }}
          >
            {getBonusesOptions(store.currentUser.bonus_count, 500).map((item, index) => <MenuItem key={index}
                                                                                value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
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
