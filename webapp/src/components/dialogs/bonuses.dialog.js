import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'

const BonusesDialog = ({open, handleClose, text, handleProof, name, link, ...props}) => {

  const {store} = props

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">{name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>{text}</div>/div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {link && <Button onClick={() => {window.open(link);}} color="primary">
          Перейти
        </Button>}
        <Button onClick={handleProof} color="primary">
          Подтвердить бонус
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(BonusesDialog))
