import React, { Component } from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import store from '../../store'
import API from '../../api/api'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .Mui-focused': {
      color: "#464646",
      '& fieldset': {
        borderColor: [["#464646"], '!important']
      }
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#FF5722'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#FF5722",
    '&:hover': {
      backgroundColor: "#E64A19"
    }
  }
})


@inject('store')
@observer
class LoginPage extends Component {

  state = {
    email: '',
    password: ''
  }

  signIn = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    store.signIn({user: {email, password}}).then(res => {
      window.location = '/'
    }).catch(console.log)
  }

  handleChange = (e) => {
    const {target: {name, value}} = e
    this.setState(currentState => ({...currentState, [name]: value}))
  }

  render () {
    const {classes, store} = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход в личный кабинет
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.signIn}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Логин"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.login}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Вход
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}


export default withStyles(styles)(LoginPage)
