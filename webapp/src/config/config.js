import React from 'react'
import { forwardRef } from 'react'
import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

export const pages = {
  admin: [
    {
      name: 'profile',
      label: 'Главная',
      subPages: []
    },
    {
      name: 'summary',
      label: 'Отчетность',
      subPages: [
        {
          name: 'table',
          label: 'Ведомость',
          subPages: []
        },
        {
          name: 'journal',
          label: 'Журнал',
          subPages: []
        },
        {
          name: 'users',
          label: 'Пользователи',
          subPages: []
        }
      ]
    },
    {
      name: 'main',
      label: 'Обучение',
      subPages: [
        {
          name: 'offers',
          label: 'Предложения',
          subPages: []
        },
        {
          name: 'reminders',
          label: 'Напоминания',
          subPages: []
        },
        {
          name: 'homework',
          label: 'Домашняя работа',
          subPages: []
        },
        {
          name: 'courses',
          label: 'Курсы',
          subPages: []
        }
      ]
    },
    {
      name: 'reports',
      label: 'Обращения',
      subPages: []
    },
    {
      name: 'statistics',
      label: 'Статистика',
      subPages: []
    }
  ],
  teacher: [
    {
      name: 'listTeacher',
      label: 'Ведомость',
      subPages: []
    },
    {
      name: 'journalTeacher',
      label: 'Журнал',
      subPages: []
    },
    {
      name: 'homeworkTeacher',
      label: 'Домашняя работа',
      subPages: []
    },
    {
      name: 'reportsTeacher',
      label: 'Сообщить руководству',
      subPages: []
    },
    {
      name: 'profileTeacher',
      label: 'Профиль',
      subPages: []
    }
  ],
  user: [
    {
      name: 'mainUser',
      label: 'Главная',
      subPages: []
    },
    {
      name: 'progressUser',
      label: 'Прогресс',
      subPages: [
        {
          name: 'scheduleUser',
          label: 'Расписание',
          subPages: []
        },
        {
          name: 'homeworkUser',
          label: 'Домашняя работа',
          subPages: []
        },
        {
          name: 'achievementsUser',
          label: 'Достижения',
          subPages: []
        }
      ]
    },
    {
      name: 'coursesUser',
      label: 'Курсы',
      subPages: []
    },
    {
      name: 'offersUser',
      label: 'Магазин',
      subPages: []
    },
    {
      name: 'lettersUser',
      label: 'Обращения',
      subPages: []
    },
    {
      name: 'profileUser',
      label: 'Профиль',
      subPages: []
    },
    {
      name: 'bonusesUser',
      label: 'Бонусы',
      subPages: []
    }
  ]
}

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
}

export const tableLocalization = {
  pagination: {
    labelDisplayedRows: '{from}-{to} из {count}',
    labelRowsSelect: 'строк'
  },
  header: {
    actions: ''
  },
  body: {
    emptyDataSourceMessage: 'Нет записей',
    filterRow: {
      filterTooltip: 'Филтр'
    },
    deleteTooltip: 'Удалить',
    editRow: {
      deleteText: 'Вы уверены что хотите удалить запись?'
    }
  },
  toolbar: {
    searchTooltip: 'Поиск',
    searchPlaceholder: 'Поиск',
    exportTitle: 'Экспорт',
    exportAriaLabel: 'Экспорт',
    exportName: 'Экспорт в CSV'
  },
  grouping: {
    placeholder: 'Перетащите заголовки столбцов',
    groupedBy: 'Сгруппировано по'
  }
}