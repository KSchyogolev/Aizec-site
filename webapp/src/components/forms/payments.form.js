import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons, tableLocalization } from '../../config/config'

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

const PaymentsForm = props => {
  const classes = useStyles()
  const {store} = props

  const usersMap = store.users && store.users.reduce((res, item) => {
    return item.role === 'user' ? {
      ...res,
      [item.id]: `${item.first_name} ${item.second_name} (${item.email})`
    } : {...res}
  }, {})

  const messagesMap = store.messages.reduce((res, item) => {
    return item.kind === 'offer' || item.kind === 'merch' ? {...res, [item.id]: item} : {...res}
  }, {})

  const merchesMap = store.merches.reduce((res, item) => ({...res, [item.id]: item}), {})

  const coursesMap = store.courses.reduce((res, item) => ({...res, [item.id]: item}), {})

  const messagesLookup = {'offer': 'Предложение', 'merch': 'Товар'}

  const getDealObject = (payment) => {
    try {
      if (payment.merch_id) return {
        id: 'merch_id',
        description: merchesMap[payment.merch_id] && merchesMap[payment.merch_id].short_description
      }
      if (payment.course_id) return {
        id: 'course_id',
        description: coursesMap[payment.course_id] && coursesMap[payment.course_id].short_description
      }
      if (payment.message_id) return {
        id: 'message_id',
        description: messagesMap[payment.message_id] && messagesMap[payment.message_id].head_text
      }
      return {
        id: 'null_id',
        description: 'Товар не найден'
      }
    } catch (err) {
      console.log(err)
    }
  }

  const translate = {
    message_id: 'Предложение',
    course_id: 'Курс',
    merch_id: 'Мерч',
    null_id: 'Тип не указан'
  }

  /*  useEffect(() => {
      store.getAllCourses()
      store.getAll('payments')
      store.getAll('users')
      // store.getAll('messages')
      // store.getAll('courses')
    }, [store.courses && store.courses.length])*/

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Покупки"
        icons={tableIcons}
        columns={[
          {
            title: 'Ученик',
            render: props => {
              try {
                return usersMap[props.user_id]
              }
              catch (err) {
                return ''
              }
            },
            filtering: false
          },
          /*          {
                      title: 'Тип товара',
                      render: props => translate[getDealObject(props).id],
                      lookup: {'message_id': 'Предложение', 'merch_id': 'Мерч'},
                      customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(getDealObject(rowData).id) !== -1
                    },*/
          {
            title: 'Тип',
            field: 'message_id',
            render: rowData => messagesMap[rowData.message_id] && messagesLookup[messagesMap[rowData.message_id].kind],
            lookup: messagesLookup,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(messagesMap[rowData.message_id].kind) !== -1
          },
          {title: 'Описание', filtering: false, render: props => getDealObject(props).description},
          {title: 'Оплачено рублями', field: 'cost', filtering: false},
          {title: 'Оплачено бонусами', field: 'bonuses', filtering: false},
          {
            title: 'Статус',
            field: 'status',
            defaultSort: 'asc',
            lookup: {'ready': 'Ожидает оплаты', 'done': 'Оплачено'}
          }
        ]}
        data={store.payments.filter(payment => payment.course_id === null)}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        editable={{
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('payments', oldData.id).then(resolve).catch(reject)),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('payments', oldData.id, newData).then(resolve).catch(reject))
        }}
      />
    </div>
  )

}

export default inject('store')(observer(PaymentsForm))
