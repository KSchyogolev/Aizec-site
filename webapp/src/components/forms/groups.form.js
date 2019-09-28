import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { MultiSearchInput } from '../inputs'
import { GroupUsersDialog } from '../dialogs'
import { tableLocalization } from '../../config/config'

import GroupIcon from '@material-ui/icons/Group'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  teacherSelect: {
    width: 400,
    margin: '15px 0',
    '& .MuiPaper-root': {
      zIndex: 10000
    }
  }
}))

const label = {
  club_id: 'Клуб',
  course_id: 'Курс'
}

const weekDays = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  7: 'Вс'
}

const LessonsForm = props => {

  const classes = useStyles()
  const {store} = props
  const [usersDialogIsOpen, setUsersDialogVisible] = useState(false)
  const [currentGroup, setCurrentGroup] = useState({})
  const [selectedTeacher, setSelectedTeacher] = useState({})

  const teachersItems = store.users.filter(item => item.role === 'teacher').map(item => ({
    label: item.second_name + ' ' + item.first_name,
    value: item.id
  }))
  console.log(teachersItems.push({
    label: '-= Не выбран =-',
    value: null
  }))

  const openUsersDialog = (group) => {
    setCurrentGroup(group)
    setUsersDialogVisible(true)
  }
  const closeUsersDialog = () => setUsersDialogVisible(false)

  useEffect(() => {
    store.getLessonsInfos()
  }, [])

  const handleSelectTeacher = (value) => {
    setSelectedTeacher(value)
  }

  const clubsItems = store.clubs.map(item => ({label: item.name, value: item.id}))
  const coursesItems = store.courses.map(item => ({label: item.short_description, value: item.id}))

  const clubMap = clubsItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})
  const coursesMap = coursesItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})

  return (
    <div className={classes.root}>
      <div className={classes.teacherSelect}>
        <MultiSearchInput multi={false} handleChange={handleSelectTeacher}
                          values={selectedTeacher} label={'Выберите преподавателя'}
                          items={teachersItems}/>
      </div>
      <MaterialTable
        title="Группы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'name', type: 'text'},
          {
            title: 'Дни недели',
            field: 'daysWeek',
            render: rowData => rowData && rowData.daysWeek && rowData.daysWeek.map(item => <span>{weekDays[item]} </span>),
            lookup: weekDays,
            editable: false
          },
          {
            title: 'Время', field: 'times',
            render: rowData => rowData && rowData.times && rowData.times.map(item => <span>{item} </span>),
            editable: false
          },
          {
            title: 'Клуб',
            field: 'club_id',
            render: rowData => <div>{clubMap[rowData.club_id]}</div>,
            editComponent: props => {
              return <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                       values={{value: props.value, label: clubMap[props.value]}} label={'Клуб'}
                                       items={clubsItems}/>
            },
            lookup: clubMap,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(rowData.club_id.toString()) !== -1
          },
          {
            title: 'Курс',
            field: 'course_id',
            render: rowData => <div>{coursesMap[rowData.course_id]}</div>,
            editComponent: props => {
              return <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                       values={{value: props.value, label: coursesMap[props.value]}} label={'Курс'}
                                       items={coursesItems}/>
            },
            lookup: coursesMap,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(rowData.course_id.toString()) !== -1
          },
          {
            title: 'Преподаватель',
            field: 'teacher',
            render: rowData => rowData && rowData.users.filter(user => user.role === 'teacher').map(item =>
              <div>{item.second_name + ' ' + item.first_name}</div>)
            ,
            filtering: false,
            editable: false
          }
        ]}
        data={store.groups.filter(group => selectedTeacher.value ? group.users.findIndex(user => user.id === selectedTeacher.value) !== -1 : true)}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        actions={[
          {
            icon: () => <GroupIcon/>,
            tooltip: 'Список группы',
            onClick: (e, rowData) => openUsersDialog(rowData)
          }
        ]}
        editable={{
          onRowAdd: newData => new Promise((resolve, reject) => store.addTo('groups', 'group', {...newData}).then(resolve).catch(reject)),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('groups', oldData.id, newData).then(resolve).catch(reject)),
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('groups', oldData.id).then(resolve).catch(reject))
        }}
      />
      <GroupUsersDialog handleClose={closeUsersDialog} open={usersDialogIsOpen} group={currentGroup}/>
    </div>
  )
}

export default inject('store')(observer(LessonsForm))
