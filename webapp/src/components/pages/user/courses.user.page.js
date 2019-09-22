import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../../config/config'
import { MessageDialog } from '../../dialogs/'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper'

import {getCurrentOffers} from './offers.user.page'

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
  description: {
    fontWeight: 600,
    padding: 20,
    /*    '-webkit-box-shadow': 'inset 10px 10px 58px -16px rgba(0,0,0,0.75)',
        '-moz-box-shadow': 'inset 10px 10px 58px -16px rgba(0,0,0,0.75)',*/
    'box-shadow': 'inset 0px 0px 30px -35px rgba(0,0,0,0.75)'
  },
  description: {
    fontStyle: 'italic',
    padding: 10,
    display: 'flex',
    backgroundColor: 'whitesmoke'
  },
  statusIcons: {
    // color: 'green'
  },
  text: {
    padding: 10,
    marginLeft: 10,
    margin: 'auto 20px'
  }
}))

const CoursesPage = props => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getCurrentOffers()

  }, [store.currentCourses.length])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {getCurrentOffers(store.currentOffers.filter(item => (item.kind === 'regular' || item.kind === 'intensive') && item.status === 'done'), 4)}
      </Grid>

      {/*<MaterialTable
        title="Доступные курсы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Стоимость', field: 'cost', filtering: false, type: 'numeric'},
          // {title: 'Стоимость в месяц', field: 'cost_month', filtering: false, type: 'numeric'},
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
                  <Paper className={classes.text}>
                  {rowData.full_description}
                  </Paper>
                </div>
              )
            }
          }
        ]}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
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
      />*/}
    </div>
  )

}

export default inject('store')(observer(CoursesPage))
