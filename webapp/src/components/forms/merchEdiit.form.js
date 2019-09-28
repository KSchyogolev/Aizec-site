import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { EntityInput, FileUploadInput } from '../inputs'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const useStyles = makeStyles(theme => ({
  root: {
    /*    display: 'flex',
        flexDirection: 'column'*/
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
  },
  textField: {
    // width: '25%'
  }
}))

const OfferEditForm = ({message = {}, onChange = () => {}}) => {
  const classes = useStyles()
  const {head_text, full_text, cost} = message

  const handleChange = (e) => {
    const {name, value} = e.target
    onChange(name, value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Заголовок"
            className={classes.textField}
            value={head_text}
            name={'head_text'}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Цена"
            value={cost}
            onChange={handleChange}
            type="number"
            name={'cost'}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">₽</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            multiline
            label="Описание"
            className={classes.textField}
            value={full_text}
            name={'full_text'}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default OfferEditForm