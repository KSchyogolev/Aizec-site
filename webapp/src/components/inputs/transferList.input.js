import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'

import SearchIcon from '@material-ui/icons/Search'
import SwapIcon from '@material-ui/icons/SwapHoriz'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  paper: {
    height: 600,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  searchInput: {
    marginBottom: 15
  },
  rowIcon:{
    color: '#757575',
    display: 'flex'
  }
}))

export default function TransferListInput ({leftList = [], rightList = [], handleAdd = () => {}, handleRemove = () => {}}) {
  const classes = useStyles()

  const [left, setLeft] = useState(leftList)
  const [right, setRight] = useState(rightList)

  const handleClickItem = (item, isLeft) => {
    return isLeft ? handleRemove(item.id).then(() => {
      const index = leftList.findIndex(a => item.id === a.id)
      let currentLeft = left
      currentLeft.splice(index, 1)
      setLeft(currentLeft)
      setRight(prev => [...prev, item])
    }) : handleAdd(item.id).then(() => {
      const index = rightList.findIndex(a => item.id === a.id)
      let currentRight = right
      currentRight.splice(index, 1)
      setRight(currentRight)
      setLeft(prev => [...prev, item])
    })

  }

  const handleSearch = (e, isLeft) => {
    if (isLeft) {
      setLeft(leftList.filter(item => item.label.includes(e.target.value)))
      return
    }
    setRight(rightList.filter(item => item.label.includes(e.target.value)))
  }

  const customList = (items, isLeft) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((item, index) => {
          const labelId = `transfer-list-item-${index}-label`
          return (
            <ListItem key={index} role="listitem" button onClick={() => handleClickItem(item, isLeft)}>
              <ListItemText id={labelId} primary={item.label}/>
              <div className={classes.rowIcon}>{item.icon}</div>
            </ListItem>
          )
        })}
        <ListItem/>
      </List>
    </Paper>
  )

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={5} md={5}>
        <h3>Группа</h3>
        <FormControl className={classes.searchInput} fullWidth>
          <Input
            placeholder='Поиск'
            onChange={e => handleSearch(e, true)}
            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
          />
        </FormControl>
        {customList(left, true)}
      </Grid>
      <Grid item xs={1} md={1}>
        <Grid container direction="column" alignItems="center">
          <SwapIcon/>
        </Grid>
      </Grid>
      <Grid item xs={5} md={5}>
        <h3>Все пользователи</h3>
        <FormControl className={classes.searchInput} fullWidth>
          <Input
            placeholder='Поиск'
            onChange={handleSearch}
            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
          />
        </FormControl>
        {customList(right)}
      </Grid>
    </Grid>
  )
}