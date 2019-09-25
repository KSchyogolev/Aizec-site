import React, { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OfferEditForm, CourseEditForm } from '../forms'
import { inject, observer } from 'mobx-react'
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
import Grid from '@material-ui/core/Grid'
import { EntityInput } from '../inputs'


const useStyles = makeStyles(theme => ({
  root: {
    // padding: '15px'
  },
  content: {
    padding: '15px'
  }
}))

const RemindersDialog = ({handleClose, open, notification, ...props}) => {
  const classes = useStyles()
  const {store} = props
  const [message, setMessage] = useState({})


  useEffect(() => {
    setMessage(notification)
  }, [notification.id])

  const handleChange = (e) => {
    console.log(e)
    const {name, value} = e.target
    setMessage(prev => ({...prev, [name]: value}))
  }

  const handleSave = () => {
    let savePromise = message.id ? () => store.updateMessage(message.id, message) : () => store.addMessage({...message, kind: 'notification'})
    savePromise().then((res) => {
      // store.addInStore('outbox', res)
      // store.showNotification('success', 'Обращение отправлено успешно')
      onClose()
    }).catch(err => {
      // store.showNotification('error', 'Ошибка при отправке обращения')
      console.log(err)
    })
  }

  const onClose = () => {
    setMessage({})
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'}
            className={classes.root}>
      <DialogTitle id="form-dialog-title">
        Напоминание
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <EntityInput handleChange={handleChange} entity_type={message.to_entity_type} entity_id={message.to_entity_id}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="parent_relationship">Приоритет</InputLabel>
                <Select
                  inputProps={{
                    name: 'head_text',
                    id: 'head_text',
                    value: message.head_text,
                    onChange:handleChange
                  }}
                >
                  <MenuItem key={1} value={1}>1</MenuItem>
                  <MenuItem key={2} value={2}>2</MenuItem>
                  <MenuItem key={3} value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                multiline
                label="Текст"
                className={classes.textField}
                value={message.full_text}
                name={'full_text'}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default inject('store')(observer(RemindersDialog))
