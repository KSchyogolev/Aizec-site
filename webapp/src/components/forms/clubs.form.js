import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  }
}))

const ClubsForm = props => {
  const classes = useStyles()
  const {store} = props
  return (
    <div className={classes.root}>
      <MaterialTable
        title="Клубы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'name'},
          {title: 'Адрес', field: 'address'}
        ]}
        data={store.clubs}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
        }}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} из {count}',
            labelRowsSelect: 'строк'
          },
          header: {
            actions: ''
          },
          body: {
            emptyDataSourceMessage: 'Нет записей',
            filterRow: {
              filterTooltip: 'Филтр'
            }
          },
          toolbar: {
            searchTooltip: 'Поиск',
            searchPlaceholder: 'Поиск'
          }
        }}
        editable={{
          onRowAdd: newData => new Promise((resolve, reject) => store.addTo('clubs', 'club', newData).then(resolve).catch(reject)),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('clubs', oldData.id, newData).then(resolve).catch(reject)),
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('clubs', oldData.id).then(resolve).catch(reject))
        }}
      />
    </div>
  )
}

export default inject('store')(observer(ClubsForm))
