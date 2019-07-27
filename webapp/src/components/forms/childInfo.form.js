import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const ChildInfoForm = props => {
  const {user, handleChange} = props

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ребенок
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="first_name"
            name="first_name"
            label="Имя"
            fullWidth
            autoComplete="fname"
            value={user.first_name}
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
            value={user.second_name}
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
            value={user.third_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="dateBirth"
            label="Дата рождения"
            type="date"
            fullWidth
            name='birthday'
            InputLabelProps={{
              shrink: true
            }}
            value={user.birthday}
            onChange={handleChange}
          />
        </Grid>
        {/*<Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="place">Площадка</InputLabel>
            <Select
              inputProps={{
                name: 'Площадка обучения',
                id: 'place'
              }}
            >
              <MenuItem value={0}>Мать</MenuItem>
              <MenuItem value={1}>Отец</MenuItem>
              <MenuItem value={2}>Опекун</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="day">Группа</InputLabel>
            <Select
              inputProps={{
                name: 'Группа',
                id: 'day'
              }}
            >
              <MenuItem value={0}>Пн</MenuItem>
              <MenuItem value={1}>Вт</MenuItem>
              <MenuItem value={2}>Ср</MenuItem>
              <MenuItem value={3}>Чт</MenuItem>
              <MenuItem value={4}>Пт</MenuItem>
              <MenuItem value={5}>Сб</MenuItem>
              <MenuItem value={6}>Вс</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            id="dateBirth"
            label=" "
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            value={user.first_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="place">Год обучения</InputLabel>
            <Select
              inputProps={{
                name: 'Год обучения',
                id: 'year'
              }}
            >
              {[1, 2, 3, 4].map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>*/}
      </Grid>
      <br/>
    </React.Fragment>
  )
}

export default ChildInfoForm