import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { FileUploadInput } from '../inputs'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'

const FileUploadDialog = ({handleClose, open, message, field, requestField, label, ...props}) => {

  const [photos, setPhotos] = useState([])

  const handleDrop = (img) => {
    setPhotos(img)
  }

  const handleSave = () => {
    store.uploadImages(photos, message.id, field, requestField).then(res => {
      handleClose()
    })
  }

  const {store} = props

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">{label}</DialogTitle>
      <DialogContent>
        <FileUploadInput pictures={photos} onDrop={handleDrop}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Загрузить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(FileUploadDialog))
