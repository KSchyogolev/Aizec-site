import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
    marginLeft: theme.spacing(1)
  },
  finalMessage: {
    padding: 40,
    borderRadius: 10,
    height: 120,
    position: 'relative'
  },
  link: {
    '& input': {
      display: 'none'
    }
  },
  rulesForm: {
    display: 'flex',
    position: 'absolute',
    bottom: 0
  }
}))

const UserRulesDialog = ({open, handleClose}) => <Dialog open={open} onClose={handleClose}
                                                         aria-labelledby="form-dialog-title" maxWidth={'md'}>
  <DialogTitle id="form-dialog-title">Пользоветельское соглашение</DialogTitle>
  <DialogContent>
    <DialogContentText>

    </DialogContentText>
  </DialogContent>
</Dialog>

const SendDataForm = props => {
  const classes = useStyles()
  const [usersRulesIsOpen, setVisibleDialog] = useState(false)

  const openRulesDialog = () => setVisibleDialog(true)
  const closeRulesDialog = () => setVisibleDialog(false)

  return <div className={classes.finalMessage}>
    <Typography variant="h5" component="h5">
      Проверьте все данные перед отправкой
    </Typography>
    <Typography component="p">
      Внесение изменений, до подтверждения анкеты, запрещено
    </Typography>
    <Typography component="div" className={classes.rulesForm}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkRules}
            onChange={(e) => props.setRules(e.target.value)}
            value="checkRules"
            color="primary"
          />
        }
        label="Я принимаю пользовательское соглашение"
      />
      <Button href="#text-buttons" className={classes.link} onClick={openRulesDialog}>
        Подробнее...
      </Button>
    </Typography>
    <UserRulesDialog open={usersRulesIsOpen} handleClose={closeRulesDialog}/>
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
      return <SendDataForm {...props}/>
    default:
      throw new Error('Unknown step')
  }
}

const Registration = props => {

  const classes = useStyles()
  const storedUser = localStorage.getItem('current_user')
  const initialUser = (storedUser && JSON.parse(storedUser)) || {}
  const isRegistered = initialUser && initialUser.status === 'not_approved'
  initialUser.parents = [{}]
  const [activeStep, setActiveStep] = useState(isRegistered ? steps.length : 0)
  const [currentUser, setUser] = useState(initialUser)
  const [checkRules, setCheckRules] = useState(false)

  const setRules = (value) => setCheckRules(value)

  const handleChange = (e) => {
    const {target: {name, value}} = e
    setUser({...currentUser, [name]: value})
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const parseParentUser = {...currentUser, parents: JSON.stringify(currentUser.parents)}
      props.store.activateUser(parseParentUser).then(res => {
        setActiveStep(activeStep + 1)
        localStorage.setItem('current_user', JSON.stringify(res))
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
                {getStepContent(activeStep, {handleChange, user: currentUser, setRules, checkRules})}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color={'primary'}
                    onClick={handleNext}
                    className={classes.button}
                    disabled={!checkRules && activeStep === steps.length - 1}
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
