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
import { FileUploadInput } from '../inputs'


const useStyles = makeStyles(theme => ({
  root: {
    // padding: '15px'
  },
  content: {
    padding: '15px'
  }
}))

const userThemes = {
  1: 'Пропуск по болезни',
  2: 'Курсы и занятия',
  3: 'Расписание',
  4: 'Пожелание',
  5: 'Жалоба',
  6: 'Оплата',
  7: 'Другое'
}

const teacherThemes = {
  1: 'Необходима замена на занятие',
  2: 'Потребность в комплектующих',
  3: 'Неисправность',
  4: 'Нарушение ',
  5: 'Другое'
}

const ReportDialog = ({handleClose, open, isUser, ...props}) => {
  const classes = useStyles()
  const {store} = props
  const [message, setMessage] = useState({})
  const [photos, setPhotos] = useState([])

  const themes = isUser ? userThemes : teacherThemes

  const handleDrop = (img) => {
    setPhotos(img)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setMessage(prev => ({...prev, [name]: value}))
  }

  const handleSave = () => {
    store.addMessage({...message, kind: 'report', to_entity_type: 'admin'}).then((res) => {
      store.addInStore('outbox', res)
      if (!photos.length) {
        store.showNotification('success', 'Обращение отправлено успешно')
        onClose()
        return
      }
      store.uploadImages(photos, res.id).then(res => {
        store.showNotification('success', 'Обращение отправлено успешно')
        onClose()
      })
    }).catch(err => {
      store.showNotification('error', 'Ошибка при отправке обращения')
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
        Сообщение администратору
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="parent_relationship">Тема</InputLabel>
              <Select
                inputProps={{
                  name: 'head_text',
                  id: 'head_text',
                  value: message.head_text,
                  onChange: handleChange
                }}
              >
                {Object.keys(themes).map((key,index) => <MenuItem key={index} value={themes[key]}>{themes[key]}</MenuItem>)}
              </Select>
            </FormControl>
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
          <Grid item xs={12} sm={12} md={12}>
            <FileUploadInput pictures={photos} onDrop={handleDrop}/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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
