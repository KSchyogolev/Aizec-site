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
      label: 'Профиль',
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
      label: 'Главная',
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
          name: 'calendar',
          label: 'Календарь',
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
      name: 'letters',
      label: 'Обращения',
      subPages: []
    },
    {
      name: 'bonuses',
      label: 'Бонусы',
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
      name: 'list',
      label: 'Ведомость',
      subPages: []
    },
    {
      name: 'journal',
      label: 'Журнал',
      subPages: []
    },
    {
      name: 'homework',
      label: 'Домашняя работа',
      subPages: []
    },
    {
      name: 'reports',
      label: 'Сообщить руководству',
      subPages: []
    }
  ],
  user: [
    {
      name: 'offersUser',
      label: 'Предложения',
      subPages: []
    },
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
      subPages: [
        /*{
          name: 'regular.course.user',
          label: 'Регулярные',
          subPages: []
        },
        {
          name: 'intense.course.user',
          label: 'Интенсивные',
          subPages: []
        },
        {
          name: 'solo.course.user',
          label: 'Индивидуальные',
          subPages: []
        }*/
      ]
    },
    {
      name: 'lettersUser',
      label: 'Обращения',
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