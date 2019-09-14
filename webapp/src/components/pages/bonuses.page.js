import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import { tableIcons } from '../../config/config'
import { tableLocalization } from '../../config/config'

const moment = require('moment')

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
    minWidth: 110
  },
  description: {
    // fontStyle: 'italic',
    padding: 10,
    display: 'flex',
    backgroundColor: 'whitesmoke'
  },
  text: {
    padding: 10,
    marginLeft: 10,
    margin: 'auto 20px'
  }
}))


const BonusesPage = props => {
  const classes = useStyles()
  const {store} = props


  return (
    <div className={classes.root}>
      <MaterialTable
        className={classes.tableShortIcons}
        title="Бонусы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'head_text', type: 'text', filtering: false},
          {title: 'Количество', field: 'head_text', type: 'text', filtering: false},
        ]}
        data={[]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
        }}
        localization={tableLocalization}
      />
    </div>
  )

}

export default inject('store')(observer(BonusesPage))
