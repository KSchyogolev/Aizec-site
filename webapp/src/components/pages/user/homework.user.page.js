import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../../config/config'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'
import WorkIcon from '@material-ui/icons/Work'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}))

const HomeworkUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  const onChangeFileHandler = (e, lessonId) => {
    const files = e.target.files
    store.uploadHomework(files).then(res => {
      console.log('SUCCESS')
    })
  }

  useEffect(() => {
    store.getUserLessons()
    store.getUserVisits()
  }, [store.currentVisits.length, store.currentLessons.length])

  return (
    <div className={classes.root}>
      <div>
        <input accept="image/*" className={classes.input} id="icon-button-file1" type="file" onChange={(file) => onChangeFileHandler(file, '123')}/>
        <label htmlFor="icon-button-file1">
          <IconButton
            className={classes.button}
            aria-label="upload picture"
            component="span"
          >
            <CloudUploadIcon />
          </IconButton>
        </label>
      </div>
      <MaterialTable
        title="Доступные уроки"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Полное описание', field: 'full_description', filtering: false}
        ]}
        detailPanel={[
          {
            tooltip: 'Констпект',
            render: rowData => {
              return (
                <div>
                  {rowData.synopsys}
                </div>
              )
            }
          },
          {
            icon: <WorkOutlineIcon/>,
            openIcon: <WorkIcon/>,
            tooltip: 'Домашняя работа',
            render: rowData => {
              return (
                <div>
                  <input accept="image/*" className={classes.input} id="icon-button-file" type="file"/>
                  <label htmlFor="icon-button-file">
                    <Button variant="contained" color="primary" className={classes.button}>
                      Загрузить
                      <CloudUploadIcon className={classes.rightIcon}/>
                    </Button>
                  </label>
                  {rowData.homework}
                </div>
              )
            }
          }
        ]}
        data={store.currentLessons.filter(item => item.status === 'open')}
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
