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
    minWidth: 300
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

const getFilterCount = (arr, params) => {
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
  const paidMerches = store.payments.length - getFilterCount(store.payments, [{key: 'merch_id', value: null}])
  const paidOffers = store.payments.length - getFilterCount(store.payments, [{key: 'message_id', value: null}])
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
    type: 'Финансы'
  }, {
    name: 'Купленные товары',
    value: paidMerches,
    type: 'Финансы'
  }, {
    name: 'Купленные предложения',
    value: paidOffers,
    type: 'Финансы'
  }, {
    name: 'Необработанные заявки на покупку',
    value: activePayments,
    type: 'Финансы'
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
  }]

  // const COLORS = ['#ffe7d1','#f6c89f', '#4b8e8d', '#396362', '#757575']
  const COLORS = ['#F47A1F', '#FDBB2F', '#377B2B', '#7AC142', '#007CC3', '#00529B']
  // const COLORS = ['#003f5c', '#444e86', '#955196', '#dd5182', '#ff6e54', '#ffa600']

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
