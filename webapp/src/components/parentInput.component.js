import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'


const parentTypes = [
  {
    value:'mother',
    label:'Мать'
  },
  {
    value:'father',
    label:'Отец'
  },
  {
    value:'rustee',
    label:'Опекун'
  },
]

const ParentInput = props => {
  const {parent, number} = props

  const handleChange = (e) => {
    props.handleChange(e, number)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {'Родитель ' + (props.number && props.number + 1 || '')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="first_name"
            name="first_name"
            label="Имя"
            fullWidth
            autoComplete="fname"
            value={parent.first_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="second_name"
            name="second_name"
            label="Фамилия"
            fullWidth
            autoComplete="lname"
            value={parent.second_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="third_name"
            name="third_name"
            label="Отчество"
            fullWidth
            autoComplete="sname"
            value={parent.third_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="date_birth"
            label="Дата рождения"
            type="date"
            name="birthday"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            value={parent.birthday}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="phone"
            name="phone"
            label="Телефон"
            fullWidth
            value={parent.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="email"
            name="email"
            label="Почта"
            fullWidth
            value={parent.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="parent_relationship">Статус</InputLabel>
            <Select
              inputProps={{
                name: 'relationship',
                id: 'parent_relationship',
                value: parent.relationship,
                onChange:handleChange
              }}
            >
              {parentTypes.map((item,index) => <MenuItem key={index} value={item.value}>{item.label}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="gender">Пол</InputLabel>
            <Select
              inputProps={{
                name: 'gender',
                id: 'gender',
                value: parent.gender,
                onChange:handleChange
              }}
            >
              <MenuItem value={true}>Мужской</MenuItem>
              <MenuItem value={false}>Женский</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br/>
    </React.Fragment>
  )
}

export default ParentInput