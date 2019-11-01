import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const OfferInfoDialog = ({open, handleClose, text, title, images, ...props}) => {

  const {store} = props

  const getImgResources = (photos) => photos.map(item => ({
    original: item.url,
    thumbnail: item.url
  }))

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText dangerouslySetInnerHTML={{__html: text}} style={{color:'rgba(0, 0, 0, 0.87)'}}>
          {/*{text}*/}
        </DialogContentText>
        {images.length ? <ImageGallery showPlayButton={false} items={getImgResources(images)}/> : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(OfferInfoDialog))
