import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { TabPanel, a11yProps } from './index'
import { CoursesForm, LessonsForm, LessonsTypesForm } from '../forms/'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  defaultBar: {
    backgroundColor: '#464646',
    '& .MuiTabs-indicator': {
      backgroundColor: '#E64A19'
    }
  }
}))

const CoursesPage = props => {
  const classes = useStyles()
  const {store} = props

  const [value, setValue] = React.useState(0)

  function handleChange (event, newValue) {
    setValue(newValue)
  }

  useEffect(() => {
    store.getAll('courses')
    store.getAll('lesson_infos')
    store.getAll('lesson_types')
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.defaultBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Курсы" {...a11yProps(0)} />
          <Tab label="Занятия" {...a11yProps(1)} />
          <Tab label="Предметы" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CoursesForm/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LessonsForm/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LessonsTypesForm/>
      </TabPanel>
    </div>
  )

}

export default inject('store')(observer(CoursesPage))
