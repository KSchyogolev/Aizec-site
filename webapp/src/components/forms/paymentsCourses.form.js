import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons, tableLocalization } from '../../config/config'
import { CoursePayDialog } from '../dialogs'
import AddIcon from '@material-ui/icons/Add'

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

const PaymentsCoursesForm = props => {
  const classes = useStyles()
  const {store} = props

  const [payDialogIsOpen, changeDialogVisible] = useState(false)

  const [payFunc, setPayFunc] = useState(() => {})

  const openPayDialog = (payment) => {
    setPayFunc(() => addPayClosure(payment))
    changeDialogVisible(true)
  }

  const closePayDialog = () => {
    changeDialogVisible(false)
  }

  const usersMap = store.users && store.users.reduce((res, item) => {
    return item.role === 'user' ? {
      ...res,
      [item.id]: `${item.first_name} ${item.second_name} (${item.email})`
    } : {...res}
  }, {})

  const coursesMap = store.courses.reduce((res, item) => ({...res, [item.id]: item}), {})

  const translate = {
    message_id: 'Предложение',
    course_id: 'Курс',
    merch_id: 'Мерч',
    null_id: 'Тип не указан'
  }

  const addPayClosure = (payment) => (value) => {
    store.updateIn('payments', payment.id, {...payment, cost: parseInt(payment.cost) + parseInt(value)}).then(res => {

    })
  }

  useEffect(() => {
    store.getAllCourses()
    // store.getAll('payments')
    // store.getAll('users')
    // store.getAll('messages')
    // store.getAll('courses')
  }, [store.courses && store.courses.length])

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
          {
            title: 'Описание',
            filtering: false,
            render: props => coursesMap[props.course_id] && coursesMap[props.course_id].short_description
          },
          {
            title: 'Оплачено занятий', filtering: false, render: props => {
            const course = coursesMap[props.course_id]
            if (!course) return ''
            const allMoney = props.cost + props.bonuses
            return Math.floor(allMoney / course.cost_month * 4 * course.lessonsWeek)
          }
          },
          {
            title: 'Занятий в неделю',
            filtering: false,
            render: props => coursesMap[props.course_id] && coursesMap[props.course_id].lessonsWeek
          },
          {
            title: 'Стоимость в месяц',
            filtering: false,
            render: props => coursesMap[props.course_id] && coursesMap[props.course_id].cost_month
          },
          {title: 'Оплачено рублями', field: 'cost', filtering: false},
          {title: 'Простить оплату', field: 'bonuses', filtering: false},
          {
            title: 'Статус',
            field: 'status',
            defaultSort: 'asc',
            lookup: {'ready': 'Требуется оплатить', 'done': 'Все занятия оплачены'}
          }
        ]}
        data={store.payments.filter(item => item.course_id)}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        actions={[
          {
            icon: () => <AddIcon/>,
            tooltip: 'Добавить платеж',
            onClick: (event, rowData) => openPayDialog(rowData)
          }
        ]}
        editable={{
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteFrom('payments', oldData.id).then(resolve).catch(reject)),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateIn('payments', oldData.id, newData).then(resolve).catch(reject))
        }}
      />
      <CoursePayDialog open={payDialogIsOpen} handleClose={closePayDialog} handleSave={payFunc}/>
    </div>
  )

}

export default inject('store')(observer(PaymentsCoursesForm))
