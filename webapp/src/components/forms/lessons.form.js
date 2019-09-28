import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { MultiSearchInput } from '../inputs'
import { GroupUsersDialog } from '../dialogs'
import { tableLocalization } from '../../config/config'
import { LessonsDialog, GenerateLessonsDialog } from '../dialogs'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import LessonsIcon from '@material-ui/icons/Filter5'
import Button from '@material-ui/core/Button'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'
import WorkIcon from '@material-ui/icons/Work'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/MoveToInbox'

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  description: {
    fontStyle: 'italic',
    padding: 10,
    display: 'flex',
    backgroundColor: 'whitesmoke'
  },
  tableShortIcons: {
    '& .MuiIconButton-root': {
      padding: '10px !important'
    }
  },
  text: {
    padding: 10,
    marginLeft: 10,
    margin: 'auto 20px'
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
  const [generateDialogIsOpen, setGenerateDialogVisible] = useState(false)
  const [currentLessonInfo, setCurrentLessonInfo] = useState({})

  const openLessonsDialog = (data) => {
    setCurrentLessonInfo(data)
    setLessonsDialogVisible(true)
  }
  const closeLessonsDialog = () => setLessonsDialogVisible(false)

  const closeGenerateDialog = () => setGenerateDialogVisible(false)
  const openGenerateDialog = () => setGenerateDialogVisible(true)

  const lessonTypeItems = store.lesson_types.map(item => ({label: item.name, value: item.id}))
  const coursesItems = store.courses.map(item => ({label: item.short_description, value: item.id}))

  const lessonTypesMap = lessonTypeItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})
  const coursesMap = coursesItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})

  return (
    <div className={classes.root}>
      <Typography component='div' className={classes.controlHeader}>
        <Button variant="contained" color="primary" className={classes.addButton} onClick={() => openGenerateDialog()}>
          <AddIcon className={classes.leftIcon}/> Сгенерировать уроки для группы
        </Button>
      </Typography>
      <MaterialTable
        className={classes.tableShortIcons}
        title="Занятия"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'short_description', type: 'text', filtering: false},
          {title: 'Описание', field: 'full_description', type: 'text', filtering: false},
         /* {
            title: 'Конспект', field: 'synopsys', type: 'text', filtering: false,
            render: () => <MoreIcon/>,
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
            render: () => <MoreIcon/>,
            editComponent: props => <TextField
              multiline
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              className={classes.textField}
              margin="normal"
            />
          },*/
          {title: 'Продолжительность', field: 'duration', type: 'numeric', filtering: false},
          {
            title: 'Предмет',
            field: 'lesson_type_id',
            render: rowData => lessonTypesMap[rowData.lesson_type_id],
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
            render: rowData => coursesMap[rowData.course_id],
            editComponent: props => (
              <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                values={{value: props.value, label: coursesMap[props.value]}} label={'Курс'}
                                items={coursesItems}/>),
            lookup: coursesMap,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(rowData.course_id.toString()) !== -1
          }
        ]}
        data={store.lesson_infos}
        detailPanel={[
          {
            tooltip: 'Конспект',
            render: rowData => {
              return (
                <div className={classes.description}>
                  <Paper className={classes.text}>
                    {rowData.synopsys}
                  </Paper>
                </div>
              )
            }
          }/*,
          {
            icon: () => <WorkOutlineIcon/>,
            openIcon: () => <WorkIcon/>,
            tooltip: 'Домашнее задание',
            render: rowData => {
              return (
                <div className={classes.description}>
                  <Paper className={classes.text}>
                    {rowData.homework}
                  </Paper>
                </div>
              )
            }
          }*/
        ]}
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
      <GenerateLessonsDialog handleClose={closeGenerateDialog} open={generateDialogIsOpen}/>
    </div>
  )
}

export default inject('store')(observer(LessonsForm))
