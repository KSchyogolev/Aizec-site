import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
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

const CourseEditForm = ({course = {}, onChange = () => {}}) => {
  const classes = useStyles()
  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabel = React.useRef(null)

  const courseTypes = [{
    name: 'Регулярный',
    value: 'regular'
  }, {
    name: 'Интенсивный',
    value: 'intensive'
  }, {
    name: 'Индивидуальный',
    value: 'individual'
  }]

  const {name, short_description, full_description, duration, kind, cost, ancestry, lessonsWeek} = course

  const handleChange = (e) => {
    const {name, value} = e.target
    onChange(name, value)
  }

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="course-kind" ref={inputLabel}>
              Тип
            </InputLabel>
            <Select input={<OutlinedInput labelWidth={labelWidth} name="kind" id='course-kind'/>} value={kind}
                    onChange={handleChange}>
              {courseTypes.map((item, index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Название"
            className={classes.textField}
            value={short_description}
            name={'short_description'}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Стоимость"
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
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Длительность(нед.)"
            value={duration}
            onChange={handleChange}
            type="number"
            name={'duration'}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Занятий в неделю"
            value={lessonsWeek}
            onChange={handleChange}
            type="number"
            name={'lessonsWeek'}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            multiline
            label="Описание"
            className={classes.textField}
            value={full_description}
            name={'full_description'}
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

export default CourseEditForm