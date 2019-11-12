import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import { inject, observer } from 'mobx-react'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import MailIcon from '@material-ui/icons/Email'
import LinkIcon from '@material-ui/icons/Link'

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  root: {
    paddingRight: 40
  },
  leftButton: {
    marginRight: 'auto'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  addButton: {
    display: 'flex'
  }
}))

const BonusesDialog = ({open, handleClose, text, handleProof, name, link, ...props}) => {
  const classes = useStyles()
  const {store} = props

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">
        <div className={classes.root}>{name}</div>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>{text}</div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {link && <Button onClick={() => {window.open(link)}} color="primary">
          <LinkIcon className={classes.leftIcon}/> Перейти
        </Button>}
        <Button onClick={handleProof} variant="contained" color="primary" className={classes.addButton}>
          <MailIcon className={classes.leftIcon}/> Подтвердить бонус
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default inject('store')(observer(BonusesDialog))
