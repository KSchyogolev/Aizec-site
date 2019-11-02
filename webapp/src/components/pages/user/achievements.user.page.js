import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import { AchievementWidget } from '../../widgets'
import { getFilterCount } from '../statistic.page'
import { ReactComponent as Grade1 } from '../../../static/icons/grade4.svg'
import { ReactComponent as Grade2 } from '../../../static/icons/grade3.svg'
import { ReactComponent as Grade3 } from '../../../static/icons/grade1.svg'
import { ReactComponent as Grade4 } from '../../../static/icons/grade2.svg'
import { ReactComponent as Robot } from '../../../static/icons/robot.svg'
import { ReactComponent as Forest } from '../../../static/icons/forest.svg'
import { ReactComponent as Regular } from '../../../static/icons/regular.svg'
import { ReactComponent as Intensive } from '../../../static/icons/intensive.svg'
import { ReactComponent as Brain } from '../../../static/icons/brain.svg'
import { ReactComponent as Client } from '../../../static/icons/client.svg'
import { ReactComponent as Ambassador } from '../../../static/icons/ambassador.svg'
import { ReactComponent as Idea } from '../../../static/icons/idea.svg'
import { ReactComponent as Nerd } from '../../../static/icons/nerd.svg'

const useStyles = makeStyles(theme => ({
  achievementGrid: {
    backgroundColor: '#228fff1f'
  }
}))

const AchievementsUserPage = (props) => {
  const classes = useStyles()
  const {store} = props
  const doneHomework = getFilterCount(store.currentVisits, [{key: 'approve_status', value: 'done_approved'}])
  const visitLessons = getFilterCount(store.currentVisits, [{key: 'status', value: 'ok'}])

  const merchesMap = store.currentOffers.reduce((res, item) => {
    return item.kind === 'merch' ? {...res, [item.id]: item} : {...res}
  }, {})

  const merchBuy = store.currentPayments.filter(item => item.message_id && merchesMap[item.message_id] && item.status === 'done').length

  const achievements = [
    {
      icon: <Grade1/>,
      title: 'Новичок',
      text: 'Сдана 1 Д/З и посещено 1 занятие',
      active: doneHomework >= 1 && visitLessons >= 1
    },
    {
      icon: <Grade2/>,
      title: 'Ученик',
      text: 'Сдано 5 Д/З и посещено 5 занятий',
      active: doneHomework >= 5 && visitLessons >= 5
    },
    {
      icon: <Grade3/>,
      title: 'Студент',
      text: 'Сдано 10 Д/З и посещено 10 занятий',
      active: doneHomework >= 10 && visitLessons >= 10
    },
    {
      icon: <Grade4/>,
      title: 'Магистр',
      text: 'Сдано 20 Д/З и посещено 20 занятий',
      active: doneHomework >= 20 && visitLessons >= 20
    },
    {
      icon: <Idea/>,
      title: 'Отличник',
      text: 'Сданы все Д/З за год',
      active: doneHomework === store.currentVisits.length
    },
    {
      icon: <Nerd/>,
      title: 'Профессор',
      text: 'Сданы все Д/З и посещены все занятия за год',
      active: doneHomework === store.currentVisits.length && visitLessons === store.currentVisits.length
    },
    {
      icon: <Client/>,
      title: 'Почетный член клуба Азимов',
      text: 'Приобрел любой мерч клуба',
      active: merchBuy > 0
    },
    {
      icon: <Ambassador/>,
      title: 'Амбассадор клуба Азимов',
      text: 'Приобрел весь мерч клуба',
      active: merchBuy >= store.currentOffers.filter(item => item.kind === 'merch').length
    },
    {
      icon: <Robot/>,
      title: 'Инженер',
      text: 'Приобрел робота',
      active: store.currentUser.bio && store.currentUser.bio.indexOf('Приобрел робота') >= 0
    },
    {
      icon: <Forest/>,
      title: 'AzimovCamp',
      text: 'Посетил летний лагерь Азимов',
      active: store.currentUser.bio && store.currentUser.bio.indexOf('Посетил летний лагерь Азимов') >= 0
    },
    {
      icon: <Brain/>,
      title: 'Элита Азимов',
      text: 'Состоит в соревновательной группе',
      active: store.currentUser.bio && store.currentUser.bio.indexOf('Состоит в соревновательной группе') >= 0
    },
    ...store.courses.filter(item => item !== 'individual').map(course => {
      const courseLessons = store.currentLessons.filter(item => item.course_id === course.id)
      const courseVisits = store.currentVisits.filter(visit => visit.status === 'ok' && visit.approve_status === 'done_approved' && courseLessons.findIndex(item => item.id === visit.lesson_id) >= 0)
      return {
        icon: course.kind === 'regular' ? <Regular/> : <Intensive/>,
        title: course.short_description,
        text: `Посетил все занятия в ${course.kind === 'regular' ? 'регулярном' : 'интенсивном'} курсе`,
        active: courseLessons.length && courseVisits >= courseLessons
      }
    })
  ]

  useEffect(() => {
    store.getAll('courses')
    store.getAll('payments')
    store.getAll('messages')
    store.getUserVisits()
    store.getCurrentOffers()
    store.getUserLessons()
    store.getUserMessages()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.achievementGrid}>
        {achievements.filter(item => item.active).map((item, index) => {
          return <Grid item
                       xs={12}
                       sm={6}
                       md={6}
                       lg={4}
                       key={index}>
            <AchievementWidget {...item}/>
          </Grid>
        })}
      </Grid>
      <br/>
      <br/>
      <br/>
      <Grid container spacing={4}>
        {achievements.filter(item => !item.active).map((item, index) => {
          return <Grid item
                       xs={12}
                       sm={6}
                       md={6}
                       lg={4}
                       key={index}>
            <AchievementWidget {...item}/>
          </Grid>
        })}
      </Grid>
    </div>
  )

}

export default inject('store')(observer(AchievementsUserPage))
