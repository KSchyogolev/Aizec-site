import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import NewIcon from '@material-ui/icons/FiberNew'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { TabPanel, a11yProps } from './index'
import { UsersMainForm, UsersArchiveForm } from '../forms/'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    margin: '15px'
  },
  actionButton: {
    padding: '0!important'
  },
  defaultBar: {
    backgroundColor: '#464646',
    '& .MuiTabs-indicator': {
      backgroundColor: '#E64A19'
    }
  }
}))

const getIconByStatus = (status) => {

  let component = <NewIcon/>,
    title = ''

  switch (status) {
    case 'new':
      component = <NewIcon style={{color: '#668bc5'}}/>
      title = 'Пользователь не состоит ни в одной группе'
      break
    default :
      return null
  }

  return <Tooltip title={title} aria-label="icon">
    {component}
  </Tooltip>
}

const UsersPage = props => {
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
          <UsersMainForm/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UsersArchiveForm/>
        </TabPanel>
      </div>
    </div>
  )
}

export default inject('store')(observer(UsersPage))
