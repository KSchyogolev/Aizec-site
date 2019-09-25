import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import ImageUploader from 'react-images-upload'
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

const MessageButtonInput = ({pictures, onDrop}) => {
  const classes = useStyles()

  return (
    <Typography component='div' className={classes.controlHeader}>
      <ImageUploader
        withLabel={false}
        withIcon={true}
        buttonText='Выберите изображения'
        onChange={onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        withPreview={true}
        pictures={pictures}
      />
    </Typography>
  )
}

export default inject('store')(observer(MessageButtonInput))
