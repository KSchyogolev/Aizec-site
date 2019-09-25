import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { MessageDialog, FileUploadDialog } from '../dialogs/'
import { tableLocalization } from '../../config/config'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CollectionsIcon from '@material-ui/icons/Collections'

const useStyles = makeStyles(theme => ({
  root: {},
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
  }
}))

const CoursesForm = props => {
  const classes = useStyles()
  const {store} = props
  const [currentCourse, setCurrentCourse] = useState({})
  const [messageDialogIsOpen, setMessageDialogVisible] = useState(false)
  const [uploadDialogIsOpen, setUploadDialogVisible] = useState(false)

  const openUploadDialog = (message) => {
    setUploadDialogVisible(true)
    setCurrentCourse(message || {})
  }
  const closeUploadDialog = () => setUploadDialogVisible(false)

  const openMessageDialog = (message) => {
    setMessageDialogVisible(true)
    setCurrentCourse(message || {})
  }
  const closeMessageDialog = () => setMessageDialogVisible(false)

  useEffect(() => {
    store.getAllCourses()
  }, [store.courses && store.courses.length])

  const saveCourse = () => {
    let savePromise = currentCourse.id ? () => store.updateCourse(currentCourse.id, currentCourse) : () => store.addCourse({
      ...currentCourse,
      kind: currentCourse.kind || 'regular'
    })
    savePromise().then(() => {
      closeMessageDialog()
    })
  }

  const handleChange = (name, value) => {
    setCurrentCourse({...currentCourse, [name]: value})
  }

  return (
    <div className={classes.root}>
      <Typography component='div' className={classes.controlHeader}>
        <Button variant="contained" color="primary" className={classes.addButton} onClick={() => openMessageDialog()}>
          <AddIcon className={classes.leftIcon}/> Добавить курс
        </Button>
      </Typography>
      <MaterialTable
        title="Курсы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', filtering: false},
          {title: 'Полное описание', field: 'full_description', filtering: false},
          {title: 'Длительность (нед.)', field: 'duration', filtering: false, type: 'numeric'},
          {title: 'Занятий в неделю', field: 'lessonsWeek', filtering: false, type: 'numeric'},
          {title: 'Стоимость', field: 'cost', filtering: false},
          {
            title: 'Тип',
            field: 'kind',
            lookup: {'intensive': 'Интенсивный', 'regular': 'Регулярный', 'individual': 'Индивидуальный'}
          }
        ]}
        data={store.courses}
        actions={[
          {
            icon: () => <CollectionsIcon/>,
            tooltip: 'Изображения',
            onClick: (event, rowData) => openUploadDialog(rowData)
          },
          {
            icon: tableIcons.Edit,
            tooltip: 'Редактировать',
            onClick: (event, rowData) => openMessageDialog(rowData)
          }
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        editable={{
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteCourse(oldData.id).then(resolve).catch(reject))
        }}
      />
      <MessageDialog handleClose={closeMessageDialog} handleSave={saveCourse} message={currentCourse}
                     handleChange={handleChange}
                     open={messageDialogIsOpen}
                     types={['course']}/>
      <FileUploadDialog handleClose={closeUploadDialog} message={currentCourse}
                        field={'course'}
                        requestField={'courses'}
                        open={uploadDialogIsOpen}/>
    </div>
  )

}

export default inject('store')(observer(CoursesForm))
