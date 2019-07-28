import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from "material-table"
import { tableIcons } from '../../config/config'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { OffersDialog } from '../dialogs/'

import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  root: {},
  addButton: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  controlHeader:{
    marginBottom: 15,
    display:'flex',
    flexDirection: 'row-reverse'
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
      <Typography component='div' className={classes.controlHeader}>
        <Button variant="contained" color="primary" className={classes.addButton} onClick={openOffersDialog}>
          <AddIcon className={classes.leftIcon}/> Добавить предложение
        </Button>
      </Typography>
      <OffersDialog handleClose={closeOffersDialog} open={offersDialogIsOpen}/>
      <MaterialTable
        title="Предложения"
        icons={tableIcons}
        columns={[
          {title: "Заголовок", field: "Name"},
          {title: "Текст", field: "text"},
          {
            title: "Тип",
            field: "type",
            lookup: {'bonus': "Бонус", 'course': "Курс", 'merch': 'Товар'}
          }
        ]}
        data={store.messages}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50]
        }}
        editable={{
          onRowAdd: newData => new Promise((resolve, reject) => {
            if (newData.role === 'user') {
              store.createByEmail(newData).then(resolve).catch(reject)
              return
            }
            store.addUser(newData).then(resolve).catch(reject)
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateUser(oldData.id, newData).then(resolve).catch(reject)),
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteUser(oldData.id).then(resolve).catch(reject))
        }}
      />
    </div>
  )

}

export default inject('store')(observer(OffersPage))
