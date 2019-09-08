import React, { useState } from 'react'
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

const useStyles = makeStyles(theme => ({
  root: {
    // padding: '15px'
  },
  content: {
    padding: '15px'
  },
}))

const ReportDialog = ({handleClose, open, ...props}) => {
  const classes = useStyles()
  const {store} = props
  const [message, setMessage] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target
    setMessage(prev => ({...prev, [name]: value}))
  }

  const handleSave = () => {
    store.addMessage({...message, kind: 'report', to_entity_type: 'admin'}).then(() => {
      store.showNotification('success', 'Обращение отправлено успешно')
      handleClose()
    }).catch(err => {
      store.showNotification('error', 'Ошибка при отправке обращения')
      console.log(err)
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'} className={classes.root}>
      <DialogTitle id="form-dialog-title">
        Сообщение администратору
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Тема"
              className={classes.textField}
              value={message.head_text}
              name={'head_text'}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              multiline
              label="Сообщение"
              className={classes.textField}
              value={message.full_text}
              name={'full_text'}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              rows={10}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default inject('store')(observer(ReportDialog))
