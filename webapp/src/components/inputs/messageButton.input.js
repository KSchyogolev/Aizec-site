import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { MessageDialog } from '../dialogs/'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  controlHeader: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  addButton: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}))

const MessageButtonInput = ({label, onSave = () => {}, onChange = () => {}, data, types = []}) => {
  const classes = useStyles()

  const [messageDialogIsOpen, setMessageDialogVisible] = useState(false)

  const openMessageDialog = (message) => {
    setMessageDialogVisible(true)
  }

  const closeMessageDialog = () => setMessageDialogVisible(false)

  return (
    <Typography component='div' className={classes.controlHeader}>
      <Button variant="contained" color="primary" className={classes.addButton} onClick={openMessageDialog}>
        <AddIcon className={classes.leftIcon}/>{label}
      </Button>
      <MessageDialog handleClose={closeMessageDialog} handleSave={onSave} message={data}
                     handleChange={onChange}
                     open={messageDialogIsOpen}
                     types={types}/>
    </Typography>
  )

}

export default inject('store')(observer(MessageButtonInput))
