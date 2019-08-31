import React, { useState } from 'react'
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
  }
}))

const label = {
  club_id: 'Клуб',
  course_id: 'Курс'
}

const LessonsForm = props => {
  const classes = useStyles()
  const {store} = props
  const [usersDialogIsOpen, setUsersDialogVisible] = useState(false)
  const [currentGroup, setCurrentGroup] = useState({})

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
        title="Группы"
        icons={tableIcons}
        columns={[
          {title: 'Название', field: 'name', type: 'text'},
          {
            title: 'Клуб',
            field: 'club_id',
            render: rowData => <div>{clubMap[rowData.club_id]}</div>,
            editComponent: props => {
              return <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                       values={{value: props.value, label: clubMap[props.value]}} label={'Клуб'}
                                       items={clubsItems}/>
            }
          },
          {
            title: 'Курс',
            field: 'course_id',
            render: rowData => <div>{coursesMap[rowData.course_id]}</div>,
            editComponent: props => (
              <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                values={{value: props.value, label: coursesMap[props.value]}} label={'Курс'}
                                items={coursesItems}/>)
          }
        ]}
        data={store.groups}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
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
