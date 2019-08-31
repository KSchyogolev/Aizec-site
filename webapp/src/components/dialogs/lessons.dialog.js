import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OfferEditForm, CourseEditForm } from '../forms'
import { inject, observer } from 'mobx-react'
import { TransferListInput } from '../inputs'

import { MultiSearchInput } from '../inputs'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TeacherIcon from '@material-ui/icons/School'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import { tableLocalization } from '../../config/config'

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  lessonsBody: {
    padding: 0
  }
}))

const LessonsDialog = ({handleClose, open, lesson_info, store}) => {
  const classes = useStyles()


  const groupsItems = lesson_info.groups ? lesson_info.groups.map(item => ({label: item.name, value: item.id})) : []
  const groupsMap = groupsItems.reduce((res, item) => ({...res, [item.value]: item.label}), {})




  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">
        Уроки
      </DialogTitle>
      <DialogContent dividers className={classes.lessonsBody}>
        <MaterialTable
          title=""
          icons={tableIcons}
          columns={[
            {title: 'Дата и время', field: 'start_time', type: 'datetime'},
            {
              title: 'Группа',
              field: 'group_id',
              render: rowData => <div>{groupsMap[rowData.group_id]}</div>,
              editComponent: props => {
                return <MultiSearchInput multi={false} handleChange={e => props.onChange(e.value)}
                                         values={{value: props.value, label: groupsMap[props.value]}} label={'Группа'}
                                         items={groupsItems}/>
              }
            },
            {
              title: 'Доступ к материалам',
              field: 'status',
              lookup: {'closed': 'Закрыт', 'open': 'Открыт'}
            }
          ]}
          data={lesson_info.lessons}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            actionsColumnIndex: -1
          }}
          localization={tableLocalization}
          editable={{
            onRowAdd: newData => new Promise((resolve, reject) => store.addTo('lessons', 'lesson', {...newData, lesson_info_id: lesson_info.id}).then(resolve).catch(reject)),
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('lessons', oldData.id, newData).then(resolve).catch(reject)),
            onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('lessons', oldData.id).then(resolve).catch(reject))
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default inject('store')(observer(LessonsDialog))
