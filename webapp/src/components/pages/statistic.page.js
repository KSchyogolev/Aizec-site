import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import { tableIcons } from '../../config/config'
import { tableLocalization } from '../../config/config'
import {
  PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer, Label
} from 'recharts'

const moment = require('moment')
const _ = require('lodash')

const useStyles = makeStyles(theme => ({
  root: {},
  addButton: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  controlHeader: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  actionCell: {
    padding: 0,
    minWidth: 110
  },
  description: {
    // fontStyle: 'italic',
    padding: 10,
    display: 'flex',
    backgroundColor: 'whitesmoke'
  },
  text: {
    padding: 10,
    marginLeft: 10,
    margin: 'auto 20px'
  },
  chartsContainer: {
    height: 400,
    marginBottom: 20,
    display: 'flex',
    // minWidth: 1200,
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  chart: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 400
  },
  chartTitle: {
    fontSize: '1.6em',
    paddingTop: 10
  }
}))

const roleName = {
  admin: 'Администратор',
  teacher: 'Учитель',
  user: 'Ученик'
}

export const getFilterCount = (arr, params) => {
  return arr.filter(item => {
    return params.reduce((res, obj) => {
      return res && item[obj.key] === obj.value
    }, true)
  }).length
}

const StatisticPage = props => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getAll('payments')
    store.getAll('courses')
    store.getAll('users')
    store.getAll('visits')
    store.getAll('messages', null, null, true)
  }, [])

  const allUsers = getFilterCount(store.users, [{key: 'role', value: 'user'}, {key: 'status', value: 'active'}])
  const allTeachers = getFilterCount(store.users, [{key: 'role', value: 'teacher'}])
  const allAdmins = getFilterCount(store.users, [{key: 'role', value: 'admin'}])
  const notActivatedUsers = getFilterCount(store.users, [{key: 'role', value: 'user'}, {
    key: 'status',
    value: 'not_activated'
  }])
  const notApprovedUsers = getFilterCount(store.users, [{key: 'role', value: 'user'}, {
    key: 'status',
    value: 'not_approved'
  }])
  const individualCourses = getFilterCount(store.courses, [{key: 'kind', value: 'individual'}])
  const regularCourses = getFilterCount(store.courses, [{key: 'kind', value: 'regular'}])
  const intensiveCourses = getFilterCount(store.courses, [{key: 'kind', value: 'intensive'}])

  const paidCourses = store.payments.length - getFilterCount(store.payments, [{key: 'course_id', value: null}])

  // const paidMerches = store.payments.length - getFilterCount(store.payments, [{key: 'merch_id', value: null}])
  // const paidOffers = store.payments.length - getFilterCount(store.payments, [{key: 'message_id', value: null}])

  const offers = store.payments.filter(item => item.message_id !== null && item.status === 'done')
  const merches = offers && offers.filter(item => {
    const message = store.messages.find(mes => mes.id === item.message_id)
    return message && message.kind === 'merch'
  })

  const paidMerches = merches.length
  const paidOffers = offers.length - merches.length

  const activePayments = getFilterCount(store.payments, [{key: 'status', value: 'ready'}])

  const usersReports = getFilterCount(store.messages, [{key: 'kind', value: 'report'}, {
    key: 'status',
    value: 'active'
  }])
  const usersReportsArchived = getFilterCount(store.messages, [{key: 'kind', value: 'report'}, {
    key: 'status',
    value: 'archived'
  }])
  const usersSkips = getFilterCount(store.messages, [{key: 'kind', value: 'skip'}, {key: 'status', value: 'active'}])
  const usersSkipsArchived = getFilterCount(store.messages, [{key: 'kind', value: 'skip'}, {
    key: 'status',
    value: 'archived'
  }])

  const skipsWithoutReason = getFilterCount(store.visits, [{key: 'status', value: 'skip_without_reason'}])
  const skipsWithReason = getFilterCount(store.visits, [{key: 'status', value: 'skip_approved'}])
  const skipsWithDocument = getFilterCount(store.visits, [{key: 'status', value: 'skip_not_approved'}])
  const allSkips = skipsWithoutReason + skipsWithReason + skipsWithDocument

  const approveHomework = getFilterCount(store.visits, [{key: 'approve_status', value: 'done_approved'}])
  const progressHomework = getFilterCount(store.visits, [{key: 'approve_status', value: 'done_not_approved'}])
  const notApprovedHomework = getFilterCount(store.visits, [{key: 'approve_status', value: 'need_fix'}])


  const coursesResult = store.payments.filter(item => item.course_id !== null).reduce((res, item) => res + item.cost, 0)

  // const merchesResult = store.payments.filter(item => item.merch_id !== null).reduce((res, item) => res + item.cost, 0)
  // const offersResult = store.payments.filter(item => item.message_id !== null).reduce((res, item) => res + item.cost, 0)

  const merchesResult = merches.reduce((res, item) => res + item.cost, 0)
  const offersResult = offers.reduce((res, item) => res + item.cost, 0) - merchesResult
  const allResult = merchesResult + coursesResult + offersResult

  let data = [{
    name: 'Активных учеников',
    value: allUsers,
    type: 'Пользователи'
  }, {
    name: 'Незарегистрированных учеников',
    value: notActivatedUsers,
    type: 'Пользователи'
  }, {
    name: 'Учеников ждет подтверждения',
    value: notApprovedUsers,
    type: 'Пользователи'
  }, {
    name: 'Всего учителей',
    value: allTeachers,
    type: 'Пользователи'
  }, {
    name: 'Всего админов',
    value: allAdmins,
    type: 'Пользователи'
  }, {
    name: 'Индивидуальные курсы',
    value: individualCourses,
    type: 'Курсы'
  }, {
    name: 'Регулярные курсы',
    value: regularCourses,
    type: 'Курсы'
  }, {
    name: 'Интенсивные курсы',
    value: intensiveCourses,
    type: 'Курсы'
  }, {
    name: 'Купленные курсы',
    value: paidCourses,
    type: 'Магазин'
  }, {
    name: 'Купленные товары',
    value: paidMerches,
    type: 'Магазин'
  }, {
    name: 'Купленные предложения',
    value: paidOffers,
    type: 'Магазин'
  }, {
    name: 'Необработанные заявки на покупку',
    value: activePayments,
    type: 'Магазин'
  }, {
    name: 'Прочитанные сообщения',
    value: usersReportsArchived,
    type: 'Обращения'
  }, {
    name: 'Непрочитанные сообщения',
    value: usersReports,
    type: 'Обращения'
  }, {
    name: 'Просмотреные справки',
    value: usersSkipsArchived,
    type: 'Обращения'
  }, {
    name: 'Непросмотреные справки',
    value: usersSkips,
    type: 'Обращения'
  }, {
    name: 'Пропущенных занятий',
    value: allSkips,
    type: 'Посещения'
  }, {
    name: 'Пропущенных занятий по уважительной причине',
    value: skipsWithReason,
    type: 'Посещения'
  }, {
    name: 'Пропущенных занятий без уважительной причины',
    value: skipsWithoutReason,
    type: 'Посещения'
  }, {
    name: 'Отправлена справка',
    value: skipsWithDocument,
    type: 'Посещения'
  }, {
    name: 'Заданий выполнено',
    value: approveHomework,
    type: 'Домашняя работа'
  }, {
    name: 'Заданий на проверке',
    value: progressHomework,
    type: 'Домашняя работа'
  }, {
    name: 'Заданий не зачтено',
    value: notApprovedHomework,
    type: 'Домашняя работа'
  }, {
    name: 'Всего выручки',
    value: allResult,
    type: 'Выручка'
  }, {
    name: 'Выручка с мерча',
    value: merchesResult,
    type: 'Выручка'
  }, {
    name: 'Выручка с предложений',
    value: offersResult,
    type: 'Выручка'
  }, {
    name: 'Выручка с курсов',
    value: coursesResult,
    type: 'Выручка'
  }]

  const COLORS = ['#F47A1F', '#FDBB2F', '#377B2B', '#7AC142', '#007CC3', '#00529B']

  const groupStatsByType = _.groupBy(data, 'type')

  return (
    <div className={classes.root}>
      <Paper className={classes.chartsContainer}>
        {Object.keys(groupStatsByType).map((key, id) => (
          <div className={classes.chart}>
            <div className={classes.chartTitle}>{key}</div>
            <ResponsiveContainer height='100%' width='100%'>
              <PieChart>
                <Pie
                  data={groupStatsByType[key]}
                  fill="#8884d8"
                  dataKey="value"
                  label
                  innerRadius={'40%'}
                >
                  {
                    groupStatsByType[key].map((entry, index) => <Cell key={`cell-${index + key}`}
                                                                      fill={COLORS[index % COLORS.length]} label/>)
                  }
                </Pie>
                <Legend/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))
        }
      </Paper>
      <MaterialTable
        title="Статистика"
        icons={tableIcons}
        columns={[
          {title: 'Поле', field: 'name', grouping: false},
          {title: 'Значение', field: 'value', grouping: false, filtering: false},
          {title: 'Тип', field: 'type', defaultGroupOrder: 0}
        ]}
        data={data}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 30, 100],
          filtering: true,
          exportButton: true,
          grouping: true
        }}
        localization={tableLocalization}
      />
    </div>
  )

}

export default inject('store')(observer(StatisticPage))
