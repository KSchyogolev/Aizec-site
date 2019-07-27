import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from "material-table"
import { tableIcons } from '../../config/config'
import Button from '@material-ui/core/Button'
import { OffersDialog } from '../dialogs/'

import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  root: {},
  button: {},
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}))


const OffersPage = props => {
  const [offersDialogIsOpen, setOffersDialogVisible] = useState(false)
  const classes = useStyles()
  const {store} = props

  const openOffersDialog = () => setOffersDialogVisible(true)
  const closeOffersDialog = () => setOffersDialogVisible(false)

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.button} onClick={openOffersDialog}>
        <AddIcon className={classes.leftIcon}/> Добавить предложение
      </Button>
      <OffersDialog handleClose={closeOffersDialog} open={offersDialogIsOpen}/>
    </div>
  )

}

export default inject('store')(observer(OffersPage))
