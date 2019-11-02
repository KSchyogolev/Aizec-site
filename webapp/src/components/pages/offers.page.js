import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { TabPanel, a11yProps } from './index'
import Tooltip from '@material-ui/core/Tooltip'
import NewIcon from '@material-ui/icons/FiberNew'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { OffersForm, OffersArchiveForm } from '../forms/'

const useStyles = makeStyles(theme => ({
  root: {},
  addButton: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  controlHeader: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  actionCell: {
    padding: 0,
    minWidth: 140
  }, defaultBar: {
    backgroundColor: '#464646',
    '& .MuiTabs-indicator': {
      backgroundColor: '#E64A19'
    }
  }
}))

const OffersPage = props => {
  const {store} = props
  const classes = useStyles()

  const [value, setValue] = useState(0)

  function handleChange (event, newValue) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.defaultBar}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Активные" {...a11yProps(0)} />
            <Tab label="Архив" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <OffersForm/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OffersArchiveForm/>
        </TabPanel>
      </div>
    </div>
  )
}

export default inject('store')(observer(OffersPage))
