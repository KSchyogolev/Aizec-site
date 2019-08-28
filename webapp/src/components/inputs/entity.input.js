import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MultiSearchInput } from './'
import { inject, observer } from 'mobx-react'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'

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
  }
}))

const EntityInput = props => {
  const {entity_type, entity_id, handleChange, store} = props

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  const [type, setType] = useState(entity_type)

  const getStoreItems = (entity_type) => {
    switch (entity_type) {
      case ('user'):
        return store.users.map(item => ({
          value: item.id,
          label: item.second_name + ' ' + item.first_name + ' ' + item.third_name
        }))
      case ('club'):
        return store.clubs.map(item => ({
          value: item.id,
          label: item.name
        }))
      default :
        return []
    }
  }

  const initOptions = getStoreItems(entity_type)
  const [suggestions, setSuggestions] = useState(initOptions)

  const getValues = (ids) => initOptions.filter(item => ids.indexOf(item.value) !== -1)

  //TODO remove array after BE update
  const [values, setValues] = useState(getValues([entity_id]))

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const labels = {
    user: 'Пользователи',
    club: 'Клубы',
    group: 'Группы',
    course: 'Курсы'
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

  const onChangeType = (e) => {
    const {value: type} = e.target
    setType(type)
    setValues([])
    setSuggestions(getStoreItems(type))
    handleChange(e)
  }

  const handleChangeMulti = (value) => {
    setValues(value)
    //TODO remove [0] after update BE for multiple ids
    handleChange({target: {name: 'to_entity_id', value: value && value.length ? value.map(item => item.value)[0] : null}})
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="entity-type" ref={inputLabel}>
          Показывать
        </InputLabel>
        <Select input={<OutlinedInput labelWidth={labelWidth} name="to_entity_type" id='entity-type'/>} value={type}
                onChange={onChangeType}>
          {entityTypes.map((item, index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
      {type && type !== 'all' &&
      <MultiSearchInput handleChange={handleChangeMulti} values={values} label={labels[type]} items={suggestions}/>}
    </div>
  )
}

export default inject('store')(observer(EntityInput))
