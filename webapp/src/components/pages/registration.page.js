import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import store from '../../store'


import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { ChildInfoForm, ParentInfoForm } from '../forms'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  finalMessage: {
    padding: 40,
    borderRadius: 10
  }
}))

const SendDataForm = props => {
  const classes = useStyles()
  return <div className={classes.finalMessage}>
    <Typography variant="h5" component="h3">
      Проверьте все данные перед отправкой.
    </Typography>
    <Typography component="p">
      Внесение изменений после отправки запрещено.
    </Typography>
  </div>
}


const steps = ['Родитель', 'Ребенок', 'Подтверждение']

const getStepContent = (step, props) => {
  switch (step) {
    case 0:
      return <ParentInfoForm {...props}/>
    case 1:
      return <ChildInfoForm {...props}/>
    case 2:
      return <SendDataForm/>
    default:
      throw new Error('Unknown step')
  }
}

const Registration = props => {

  const classes = useStyles()
  const storedUser = localStorage.getItem('current_user')
  const initialUser = (storedUser && JSON.parse(storedUser)) || {}
  const isRegistered = storedUser && storedUser.status === 'not_approved'
  const [activeStep, setActiveStep] = useState(isRegistered ? steps.length : 0)
  const [currentUser, setUser] = useState(initialUser)

/*
  useEffect(() => {
    console.log(currentUser)
  });
*/

  const handleChange = (e) => {
    const {target: {name, value}} = e
    setUser({...currentUser, [name]: value})
  }

  const handleNext = () => {
    if(activeStep === steps.length - 1) {
      props.store.updateUser('testId',currentUser).then(()=>{
        setActiveStep(activeStep + 1)
      })
      return
    }
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Регистрация
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Регистрация завершена
                </Typography>
                <Typography variant="subtitle1">
                  Ваша заявка ожидает подтверждения, зайдите в личный кабинет позже.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, {handleChange, user: currentUser})}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Отправить данные' : 'Далее'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}

export default inject('store')(observer(Registration))
