import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MultiSearchInput } from './'
import { inject, observer } from 'mobx-react'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#83baff1f',
    padding: 15,
    borderRadius: 10
  },
  formControl: {
    paddingRight: 30,
    minWidth: 250
  },
  filterField: {
    zIndex: '10000000 !important',
    '& .MiuPaper-root': {
      zIndex: '10000000 !important'
    }
  },
  visibleLabel: {
    // padding: 15,
    fontSize: '1.2rem'
  }
}))

const EntityInput = props => {
  const {entity_type, entity_id, handleChange, store} = props

  const nullFilter = {
    course: null,
    group: null,
    user: null,
    club: null
  }

  const getList = (key) => {
    switch (key) {
      case ('user'):
        return store.users.map(item => ({
          label: item.second_name + ' ' + item.first_name,
          value: item.id
        }))
      case ('group'):
        return store.groups.map(item => ({
          label: item.name,
          value: item.id
        }))
      case ('club'):
        return store.clubs.map(item => ({
          label: item.name,
          value: item.id
        }))
      case ('course'):
        return store.courses.map(item => ({
          label: item.short_description,
          value: item.id
        }))
      default :
        return []
    }
  }


  const initFilter = Object.keys(nullFilter).map(key => {
    if (key === entity_type) {
      return {[key]: getList(key).find(item => item.value === entity_id)}
    }
    return {[key] : null}
  }).reduce((res, item) => ({...res, ...item}), {})

  console.log(initFilter)


  const [filter, setFilter] = useState(initFilter)
  // const [suggestions, setSuggestions] = useState(initOptions)

  //TODO remove array after BE update
  // const [values, setValues] = useState(getValues([entity_id]))
  // const [values, setValues] = useState(getValues([entity_id]))

  const clubsItems = [...store.clubs.map(item => ({
    label: item.name,
    value: item.id
  })), {label: '- не выбрано -', value: null}]

  let currentGroups = store.groups.filter(item => (!filter.course || !filter.course.value || item.course_id === filter.course.value) && (!filter.club || !filter.club.value || item.club_id === filter.club.value))

  let currentUsers = filter.group && filter.group.value ? store.groups.find(item => item.id === filter.group.value).users : store.users

  currentUsers = currentUsers.filter(item => item.role === 'user' && item.status === 'active')

  const usersItems = [...currentUsers.map(item => ({
    label: item.second_name + ' ' + item.first_name,
    value: item.id
  })), {label: '- не выбрано -', value: null}]

  const coursesItems = [...store.courses.map(item => ({
    label: item.short_description,
    value: item.id
  })), {label: '- не выбрано -', value: null}]

  const groupsItems = [...currentGroups.map(item => ({
    label: item.name,
    value: item.id
  })), {label: '- не выбрано -', value: null}]

  const handleChangeFilter = (field) => (e) => {

    switch (field) {
      case 'club': {
        setFilter(prev => ({...nullFilter, club: e, course: prev.course}))
        break
      }
      case 'course': {
        setFilter(prev => ({...nullFilter, course: e, club: prev.club}))
        break
      }
      case 'group': {
        setFilter(prev => ({...nullFilter, group: e, course: prev.course, club: prev.club}))
        break
      }
      case 'user': {
        setFilter(prev => ({...prev, user: e}))
        break
      }
      default:
        return
    }
  }

  useEffect(() => {
    handleUpdateEntity()
  }, [filter])

  const getFilterField = () => {
    if (filter.user && filter.user.value)
      return 'user'
    if (filter.group && filter.group.value)
      return 'group'
    if (filter.course && filter.course.value)
      return 'course'
    if (filter.club && filter.club.value)
      return 'club'
  }

  // const prtioritys = ['user', 'group', 'course', 'club']

  const handleUpdateEntity = () => {
    if (filter.user && filter.user.value) {
      handleChange({target: {name: 'to_entity_id', value: filter.user.value}})
      handleChange({target: {name: 'to_entity_type', value: 'user'}})
      return
    }
    if (filter.group && filter.group.value) {
      handleChange({target: {name: 'to_entity_id', value: filter.group.value}})
      handleChange({target: {name: 'to_entity_type', value: 'group'}})
      return
    }
    if (filter.course && filter.course.value) {
      handleChange({target: {name: 'to_entity_id', value: filter.course.value}})
      handleChange({target: {name: 'to_entity_type', value: 'course'}})
      return
    }
    if (filter.club && filter.club.value) {
      handleChange({target: {name: 'to_entity_id', value: filter.club.value}})
      handleChange({target: {name: 'to_entity_type', value: 'club'}})
      return
    }
  }

  const getLabel = (field) => {
    switch (field) {
      case ('club') :
        return <span>Все члены клуба <b style={{color: '#FF5722'}}>{filter.club.label}</b></span>
      case ('course') :
        return <span>Все члены курса <b style={{color: '#FF5722'}}>{filter.course.label}</b></span>
      case ('group') :
        return <span>Все члены группы <b style={{color: '#FF5722'}}>{filter.group.label}</b></span>
      case ('user') :
        return <span>Пользователь <b style={{color: '#FF5722'}}>{filter.user.label}</b></span>
      default:
        return <span><b style={{color: '#FF5722'}}>Все</b></span>
    }
  }

  const entityTypes = [{
    value: 'all',
    name: 'Всем'
  }, {
    value: 'user',
    name: 'Пользователям'
  }, {
    value: 'club',
    name: 'Клубам'
  }, {
    value: 'group',
    name: 'Группам'
  }, {
    value: 'course',
    name: 'Курсам'
  }]

  /*  const onChangeType = (e) => {
      const {value: type} = e.target
      setType(type)
      setValues(null)
      setSuggestions(getStoreItems(type))
      handleChange(e)
    }

    const handleChangeMulti = (value) => {
      setValues(value)
      // handleChange({target: {name: 'to_entity_id', value: value && value.length ? value.map(item => item.value) : null}})
      handleChange({target: {name: 'to_entity_id', value: value && value.value}})
    }*/

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sm={6} lg={4}>
          <MultiSearchInput multi={false} handleChange={handleChangeFilter('club')}
                            values={filter.club} label={'Клуб'}
                            fullWidth
                            items={clubsItems}/>
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={4}>
          <MultiSearchInput multi={false} handleChange={handleChangeFilter('course')}
                            values={filter.course} label={'Курс'}
                            fullWidth
                            items={coursesItems}/>
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={4}>
          <MultiSearchInput handleChange={handleChangeFilter('group')} values={filter.group}
                            label={'Группа'} items={groupsItems}
                            fullWidth
                            multi={false}/>
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={4}>
          <MultiSearchInput handleChange={handleChangeFilter('user')} values={filter.user}
                            label={'Пользователь'} items={usersItems}
                            fullWidth
                            multi={false}/>
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={8}>
          <div className={classes.visibleLabel}>
            <div>Видят:</div>
            <div>{getLabel(getFilterField(filter))}</div>
          </div>
        </Grid>
      </Grid>
      {/*      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="entity-type" ref={inputLabel}>
          Показывать
        </InputLabel>
        <Select input={<OutlinedInput labelWidth={labelWidth} name="to_entity_type" id='entity-type'/>} value={type}
                onChange={onChangeType}>
          {entityTypes.map((item, index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
      {type && type !== 'all' &&
      <MultiSearchInput handleChange={handleChangeMulti} values={values} label={labels[type]} items={suggestions}
                        multi={false}/>}*/}
    </div>
  )
}

export default inject('store')(observer(EntityInput))
