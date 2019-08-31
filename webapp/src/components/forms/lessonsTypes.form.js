import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { tableLocalization } from '../../config/config'

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  }
}))

const LessonsTypesForm = props => {
  const classes = useStyles()
  const {store} = props

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Предметы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'name', type: 'text'},
        ]}
        data={store.lesson_types}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
        }}
        localization={tableLocalization}
        editable={{
          onRowAdd: newData => new Promise((resolve, reject) => store.addTo('lesson_types', 'lesson_type', {...newData}).then(resolve).catch(reject)),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('lesson_types', oldData.id, newData).then(resolve).catch(reject)),
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('lesson_types', oldData.id).then(resolve).catch(reject))
        }}
      />
    </div>
  )
}

export default inject('store')(observer(LessonsTypesForm))
