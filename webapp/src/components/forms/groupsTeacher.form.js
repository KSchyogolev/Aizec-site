import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { MultiSearchInput } from '../inputs'
import { GroupUsersTeacherDialog } from '../dialogs'
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

const GroupsTeacherForm = props => {

  const classes = useStyles()
  const {store} = props
  const [usersDialogIsOpen, setUsersDialogVisible] = useState(false)
  const [currentGroup, setCurrentGroup] = useState({})
  const [selectedTeacher, setSelectedTeacher] = useState({})

  const openUsersDialog = (group) => {
    setCurrentGroup(group)
    setUsersDialogVisible(true)
  }
  const closeUsersDialog = () => setUsersDialogVisible(false)

  const clubsItems = store.clubs.map(item => ({label: item.name, value: item.id}))
  const coursesItems = store.courses.map(item => ({label: item.short_description, value: item.id}))

  const clubMap = clubsItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})
  const coursesMap = coursesItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Мои группы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'name', type: 'text'},
          {
            title: 'Дни недели',
            field: 'daysWeek',
            render: rowData => rowData.daysWeek && rowData.daysWeek.map(item => <span>{weekDays[item]} </span>),
            lookup: weekDays,
            customFilterAndSearch: (term, rowData) => {
              const findTerm = rowData.daysWeek.some(item => {
                  return term.indexOf(String(item)) !== -1
                }
              )
              return !term.length || findTerm
            },
            editable: false
          },
          {
            title: 'Время', field: 'times',
            render: rowData => rowData.times && rowData.times.map(item => <span>{item} </span>),
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
          }
        ]}
        data={store.groups.filter(item => item.users.findIndex(user=> user.id === store.currentUser.id) !== -1)}
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
        editable={false}
      />
      <GroupUsersTeacherDialog handleClose={closeUsersDialog} open={usersDialogIsOpen} users={currentGroup.users}
                               title={currentGroup.name}/>
    </div>
  )
}

export default inject('store')(observer(GroupsTeacherForm))
