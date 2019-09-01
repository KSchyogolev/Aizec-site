import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../../config/config'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const HomeworkUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getUserLessons()
  }, [store.currentLessons.length])

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Уроки"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Полное описание', field: 'full_description', filtering: false},
        ]}
        data={store.currentLessons}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50]
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
      />
    </div>
  )
}

export default inject('store')(observer(HomeworkUserPage))
