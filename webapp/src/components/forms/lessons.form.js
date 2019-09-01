import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { MultiSearchInput } from '../inputs'
import { GroupUsersDialog } from '../dialogs'
import { tableLocalization } from '../../config/config'
import { LessonsDialog } from '../dialogs'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import LessonsIcon from '@material-ui/icons/Filter5'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}))

const label = {
  club_id: 'Клуб',
  course_id: 'Курс'
}

const LessonsForm = props => {
  const classes = useStyles()
  const {store} = props
  const [lessonsDialogIsOpen, setLessonsDialogVisible] = useState(false)
  const [currentLessonInfo, setCurrentLessonInfo] = useState({})

  const openLessonsDialog = (data) => {
    setCurrentLessonInfo(data)
    setLessonsDialogVisible(true)
  }
  const closeLessonsDialog = () => setLessonsDialogVisible(false)

  const lessonTypeItems = store.lesson_types.map(item => ({label: item.name, value: item.id}))
  const coursesItems = store.courses.map(item => ({label: item.short_description, value: item.id}))

  const lessonTypesMap = lessonTypeItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})
  const coursesMap = coursesItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Занятия"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', type: 'text', filtering: false},
          {title: 'Описание', field: 'full_description', type: 'text', filtering: false},
          {
            title: 'Конспект', field: 'synopsys', type: 'text', filtering: false,
            editComponent: props => <TextField
              multiline
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              className={classes.textField}
              margin="normal"
            />
          },
          {
            title: 'Домашнее задание',
            field: 'homework',
            filtering: false,
            editComponent: props => <TextField
              multiline
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              className={classes.textField}
              margin="normal"
            />
          },
          {title: 'Продолжительность', field: 'duration', type: 'numeric', filtering: false},
          {
            title: 'Предмет',
            field: 'lesson_type_id',
            render: rowData => <div>{lessonTypesMap[rowData.lesson_type_id]}</div>,
            editComponent: props => (
              <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                values={{value: props.value, label: lessonTypesMap[props.value]}} label={'Предмет'}
                                items={lessonTypeItems}/>),
            lookup: lessonTypesMap,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(rowData.lesson_type_id.toString()) !== -1
          },
          {
            title: 'Курс',
            field: 'course_id',
            render: rowData => <div>{coursesMap[rowData.course_id]}</div>,
            editComponent: props => (
              <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                values={{value: props.value, label: coursesMap[props.value]}} label={'Курс'}
                                items={coursesItems}/>),
            lookup: coursesMap,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(rowData.course_id.toString()) !== -1
          }
        ]}
        data={store.lesson_infos}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        actions={[
          {
            icon: () => <LessonsIcon/>,
            tooltip: 'Список уроков',
            onClick: (e, rowData) => openLessonsDialog(rowData)
          }
        ]}
        editable={{
          onRowAdd: newData => new Promise((resolve, reject) => store.addTo('lesson_infos', 'lesson_info', {...newData}).then(resolve).catch(reject)),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('lesson_infos', oldData.id, newData).then(resolve).catch(reject)),
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('lesson_infos', oldData.id).then(resolve).catch(reject))
        }}
      />
      <LessonsDialog handleClose={closeLessonsDialog} open={lessonsDialogIsOpen} lesson={currentLessonInfo}/>
    </div>
  )
}

export default inject('store')(observer(LessonsForm))
