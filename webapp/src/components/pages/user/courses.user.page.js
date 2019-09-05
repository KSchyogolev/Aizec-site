import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../../config/config'
import { MessageDialog } from '../../dialogs/'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  controlHeader: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  addButton: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  description :{
    padding: 20,
    backgroundColor: '#f1f1f1'
  }
}))

const CoursesPage = props => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getCurrentCourses()
  }, [store.currentCourses.length])

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Курсы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Стоимость', field: 'cost', filtering: false, type: 'numeric'},
          {title: 'Стоимость в месяц', field: 'cost_month', filtering: false, type: 'numeric'},
          {
            title: 'Тип',
            field: 'kind',
            lookup: {'intensive': 'Интенсивный', 'regular': 'Регулярный', 'individual': 'Индивидуальный'}
          }
        ]}
        data={store.currentCourses}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          filtering: true
        }}
        detailPanel={[
          {
            tooltip: 'Описание',
            render: rowData => {
              return (
                <div className={classes.description}>
                  {rowData.full_description}
                </div>
              )
            }
          }
        ]}
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
      />
    </div>
  )

}

export default inject('store')(observer(CoursesPage))
