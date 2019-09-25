import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OfferEditForm, CourseEditForm } from '../forms'
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import { FileUploadInput } from '../inputs'
import { MultiSearchInput } from '../inputs'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    // padding: '15px'
  },
  content: {
    padding: '15px'
  },
  bottomButton: {
    margin: '30px 0'
  },
  weekDays: {
    flexDirection: 'row'
  }
}))

const weekDays = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  7: 'Вс'
}

const getNextDay = (dayINeed) => {
  const today = moment().isoWeekday();

  if (today <= dayINeed) {
    return moment().isoWeekday(dayINeed);
  } else {
    return moment().add(1, 'weeks').isoWeekday(dayINeed);
  }
}

const GenerateLessonsDialog = ({handleClose, open, ...props}) => {
  const classes = useStyles()
  const {store} = props
  const [courseGroups, setGroups] = useState([])
  const [params, setParams] = useState({
    time: '18:00',
    weekDays: [],
    course: {},
    group: {}
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setParameter(name, value)
  }

  const handleCheck = key => e => {
    if (e.target.checked) {
      setParameter('weekDays', [...params.weekDays, key])
      return
    }

    const index = params.weekDays.indexOf(key)
    let newDays = [...params.weekDays]
    newDays.splice(index, 1)
    setParameter('weekDays', newDays)
  }

  const coursesItems = store.courses.map(item => ({label: item.short_description, value: item.id}))

  const groupsItems = courseGroups.map(item => ({
    label: item.name,
    value: item.id
  }))

  const setParameter = (key, value) => setParams(prev => ({...prev, [key]: value}))

  const handleSave = ({course, group, time, weekDays}) => {
    const week = weekDays.sort((a,b) => a - b)
    const timeArr = time.split(':')
    store.getCourseLessons(course.value).then(res => {
      const lessons = res.data
      let weekNumber = 1,
        dayIndex = 0
      const pArray = lessons.map(async lesson => {
        console.log(week[dayIndex], weekNumber)
        const date = moment().add('week', weekNumber).day(week[dayIndex])
        dayIndex ++
        if (dayIndex >= week.length) {
          weekNumber ++
          dayIndex = 0
        }
        return await store.addTo('lessons', 'lesson', {
          start_time: date.utcOffset(0).set({hour:timeArr[0],minute:timeArr[1]}),
          status: 'closed',
          group_id: group.value,
          lesson_info_id: lesson.id
        })
      })
      Promise.all(pArray).then(res => {
        store.showNotification('success', 'Уроки сгенерированы успешно' )
        window.location.reload()
        onClose()
      }).catch(err => {
        store.showNotification('error', 'Ошибка при генерации уроков')
        console.log(err)
      })
    })

    /*    store.addMessage({...message, kind: 'report', to_entity_type: 'admin'}).then((res) => {
          store.showNotification('success', 'Обращение отправлено успешно')
          onClose()
        }).catch(err => {
          store.showNotification('error', 'Ошибка при отправке обращения')
          console.log(err)
        })*/
  }

  const onClose = () => {
    handleClose()
  }

  const handleSelectCourse = (e) => {
    setParameter('group', {})
    store.getCourseGroups(e.value).then(res => {
      setGroups(res.data)
      setParameter('course', e)
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'}
            className={classes.root}>
      <DialogTitle id="form-dialog-title">
        Создание уроков для группы
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MultiSearchInput multi={false} handleChange={handleSelectCourse}
                              values={params.course} label={'Курс'}
                              items={coursesItems}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            {
              params.course.value ?
                <MultiSearchInput handleChange={(e) => setParameter('group', e)} values={params.group}
                                  label={'Группа'} items={groupsItems}
                                  multi={false}/> : null
            }
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField
              id="time"
              label="Время"
              type="time"
              fullWidth
              name={'time'}
              value={params.time}
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9}></Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div>Дни недели</div>
            <FormGroup className={classes.weekDays}>
              {Object.keys(weekDays).map(key => <FormControlLabel
                control={<Checkbox checked={params.weekDays.indexOf(key) !== -1} onChange={handleCheck(key)} value={key}/>}
                label={weekDays[key]}
              />)}
            </FormGroup>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" className={classes.bottomButton} onClick={() => handleSave(params)}>
          Сгенерировать
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default inject('store')(observer(GenerateLessonsDialog))
