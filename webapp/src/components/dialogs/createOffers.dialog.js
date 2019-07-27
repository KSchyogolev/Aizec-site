import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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
  }
}))


const OffersDialog = props => {
  const classes = useStyles()
  const {handleClose, open} = props
  const [offerType, setOfferType] = useState('')

  const offerTypes = [
    {name: 'Бонус', value: 'bonus'},
    {name: 'Курс', value: 'course'},
    {name: 'Товар', value: 'product'}
  ]

  const handleChangeType = (e) => {
    setOfferType(e.target.value)
  }


  const saveOffer = () => {
    handleClose()
  }

  const getFormByType = (type) => {

    switch (type) {
      case 'bonus' :
        return <div>bonus</div>
      case 'course' :
        return <div>course</div>
      case 'product' :
        return <div>product</div>
      default:
        return <div className={classes.emptyType}></div>
    }

  }


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">
        <FormControl className={classes.typeSelect}>
          <InputLabel htmlFor="age-simple">Тип предложения</InputLabel>
          <Select
            value={offerType}
            onChange={handleChangeType}
            inputProps={{
              name: 'offer-type',
              id: 'offer-type'
            }}
          >{offerTypes.map((item, index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)}
          </Select>
        </FormControl>
      </DialogTitle>
      <DialogContent dividers>

        {getFormByType(offerType)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Выйти
        </Button>
        <Button onClick={saveOffer} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default OffersDialog
{/*    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Новое предложение</DialogTitle>
      <DialogContent>
        <DialogContentText>
           <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Тип предложения</InputLabel>
              <Select
                value={offerType}
                onChange={handleChangeType}
                inputProps={{
                  name: 'offer-type',
                  id: 'offer-type'
                }}
              >{offerTypes.map((item, index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
            {getFormByType(offerType)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Выйти
        </Button>
        <Button onClick={saveOffer} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>*/
}