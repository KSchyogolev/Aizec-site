import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OfferEditForm } from '../forms'

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
  },
  messageEditBody: {
    height: 400
  }
}))

const MessageDialog = ({handleClose, handleSave, handleChange, open, types = [], message = {}}) => {
  const classes = useStyles()
  const messageTypes = [
    {name: 'Бонус', value: 'bonus'},
    {name: 'Курс', value: 'course'},
    {name: 'Товар', value: 'product'},
    {name: 'Предложение', value: 'offer'}
  ].filter(item => types.indexOf(item.value) !== -1)

  const handleChangeType = (e) => handleChange('kind', e.target.value)

  const getFormByType = (type) => {
    let contentBody = ''
    switch (type) {
      case 'bonus' :
        contentBody = 'bonus'
        break
      case 'course' :
        contentBody = 'course'
        break
      case 'product' :
        contentBody = 'product'
        break
      case 'offer' :
        contentBody = <OfferEditForm onChange={handleChange} message={message}/>
        break
      default:
        contentBody = 'Type not found'
        break
    }

    return <div className={classes.messageEditBody}>{contentBody}</div>
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">
        <FormControl className={classes.typeSelect}>
          <InputLabel htmlFor="age-simple">Тип предложения</InputLabel>
          <Select
            value={message.kind}
            onChange={handleChangeType}
            inputProps={{
              name: 'offer-type',
              id: 'offer-type'
            }}
          >{messageTypes.map((item, index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)}
          </Select>
        </FormControl>
      </DialogTitle>
      <DialogContent dividers>
        {getFormByType(message.kind)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default MessageDialog
