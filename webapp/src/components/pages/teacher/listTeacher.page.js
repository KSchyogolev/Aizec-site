import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

import { ClubsForm, GroupsForm, UsersForm } from '../../forms'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export const TabPanel = ({children, value, index, ...other}) => <Typography
  component="div"
  role="tabpanel"
  hidden={value !== index}
  id={`simple-tabpanel-${index}`}
  aria-labelledby={`simple-tab-${index}`}
  {...other}
>
  <Box p={3}>{children}</Box>
</Typography>

export const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
})

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

const ListTeacherPage = props => {
  const classes = useStyles()
  const {store} = props

  const [value, setValue] = React.useState(0)

  function handleChange (event, newValue) {
    setValue(newValue)
  }

  useEffect(() => {
    store.getUserObjects('groups', null, 'currentGroups')
    store.getUserObjects('courses', null, 'currentCourses')
    store.getUserObjects('clubs', null, 'currentClubs')
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.defaultBar}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Клубы" {...a11yProps(0)} />
          <Tab label="Группы" {...a11yProps(1)} />
          <Tab label="Ученики" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ClubsForm/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GroupsForm/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UsersForm/>
      </TabPanel>
    </div>
  )

}

export default inject('store')(observer(ListTeacherPage))
