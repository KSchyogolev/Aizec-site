import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import { Paper } from '@material-ui/core/'
import { MultiSearchInput } from '../inputs'
import moment from 'moment'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import VisibilityIcon from '@material-ui/icons/Lock'
import VisibilityOffIcon from '@material-ui/icons/LockOpen'
import CheckIcon from '@material-ui/icons/CheckCircle'
import ReceiptIcon from '@material-ui/icons/Receipt'
import ReportIcon from '@material-ui/icons/Error'
import Button from '@material-ui/core/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import API from '../../api/api'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  courseSelect: {
    width: 400,
    margin: '15px 0'
  },
  objectBox: {
    margin: '15px 0',
    '& h6': {
      textAlign: 'left',
      padding: 20
    }
  },
  groupTable: {
    padding: 30
  },
  groupTitle: {
    textAlign: 'left',
    padding: 10,
    fontSize: 18
  },
  cellBox: {
    padding: 2,
    '& .MuiListItem-button': {
      height: 36
    }
  },
  menuButton: {
    display: 'flex',
    margin: '10px auto'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}))
const options = [
  {
    value: 'ok',
    label: 'Был на занятии'
  }, {
    value: 'skip_without_reason',
    label: 'Пропуск без ув.причины'
  }, {
    value: 'skip_approved',
    label: 'Пропуск с ув.причиной'
  }, {
    value: 'skip_not_approved',
    label: 'Прислал справку'
  }
]

const getLessonInfo = (status) => {
  switch (status) {
    case 'ok':
      return {
        title: 'Был на занятии',
        icon: <CheckIcon style={{color: '#73c56e', marginRight: 5}}/>
      }
    case 'skip_without_reason':
      return {
        title: 'Пропуск без ув. причины',
        icon: <ReportIcon style={{color: '#c54436', marginRight: 5}}/>
      }
    case 'skip_approved':
      return {
        title: 'Пропуск по ув. причине',
        icon: <ReportIcon style={{color: '#faaa0c', marginRight: 5}}/>
      }
    case 'skip_not_approved':
      return {
        title: 'Прислал справку',
        icon: <ReceiptIcon style={{color: '#668bc5', marginRight: 5}}/>
      }
    default:
      return {
        title: '',
        icon: ''
      }
  }
}

const statusColors = {
  ok: '#73c56e',
  skip_without_reason: '#c54436',
  skip_approved: '#faaa0c',
  skip_not_approved: '#668bc5',
  null: '#d9d9d9'
}

const JournalPage = props => {
  const classes = useStyles()
  const {store} = props
  const [selectedCourse, setSelectedCourse] = useState({})

  const coursesItems = store.courses.map(item => ({label: item.short_description, value: item.id}))

  const groupsMap = store.groups.reduce((res, item) => ({
    ...res,
    [item.id]: item
  }), {})

  const downloadDocument = (visitId, fileName = 'Справка') => {
    store.getVisitFiles(visitId).then(res => {
      res.forEach(item => {
        if (item.kind === 'skip')
          item.photos.forEach(photo => {
            const ext = photo.url.split('.').pop()
            API.main.downloadFile(photo.url).then(res => {
              const url = window.URL.createObjectURL(new Blob([res.data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', `${fileName}.${ext}`)
              document.body.appendChild(link)
              link.click()
            })
          })
      })
    })
  }

  const handleSelectCourse = (course) => {
    console.log(course)
    setSelectedCourse(course)
    setLessonsByCourseId(course.value)
  }

  const setLessonStatus = (id, status, journalIndex, lessonIndex) => {
    store.updateIn('lessons', id, {status: status}).then(res => {
      const journalLesson = {...store.journalLessons[journalIndex]}
      journalLesson.lessonsByGroups[res.group_id][lessonIndex].status = res.status
      let journalLessons = [...store.journalLessons]
      journalLessons[journalIndex] = journalLesson
      store.setStore('journalLessons', journalLessons)
    })
  }

  const VisibilityButton = ({lessonId, status, journalIndex, lessonIndex}) => {
    const newStatus = status === 'open' ? 'closed' : 'open'
    return <IconButton aria-label="edit" className={classes.margin}
                       onClick={() => {setLessonStatus(lessonId, newStatus, journalIndex, lessonIndex)}}>
      {status === 'closed' ? <VisibilityIcon/> : <VisibilityOffIcon style={{color: '#73c56e'}}/>}
    </IconButton>
  }

  const VisitCell = ({visit = {}, disabled = false, jIndex = 0, lIndex = 0, vIndex = 0, grpId = 0}) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    function handleClickListItem (event) {
      setAnchorEl(event.currentTarget)
    }

    function handleMenuItemClick (item, jIndex, lIndex, vIndex, grpId) {
      setAnchorEl(null)
      store.updateVisit(visit.id, {status: item.value}).then(res => {
        const journalLesson = {...store.journalLessons[jIndex]}
        journalLesson.lessonsByGroups[grpId][lIndex].visits[vIndex] = res.data
        let journalLessons = [...store.journalLessons]
        journalLessons[jIndex] = journalLesson
        store.setStore('journalLessons', journalLessons)
      })
    }

    function handleClose () {
      setAnchorEl(null)
    }

    return <div>
      <List component="div" className={classes.cellBox}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
          style={{'background-color': visit.status ? statusColors[visit.status] : ''}}
        >
          <ListItemText/>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((item, index) => (
          <MenuItem
            disabled={disabled}
            key={index}
            selected={visit.status === item.value}
            onClick={() => handleMenuItemClick(item, jIndex, lIndex, vIndex, grpId)}
          >
            {getLessonInfo(item.value).icon}{item.label}
          </MenuItem>
        ))}
        <Button variant="contained" color="primary" disabled={visit.status !== 'skip_not_approved'}
                className={classes.menuButton} onClick={() => downloadDocument(visit.id)}>
          <CloudDownloadIcon className={classes.leftIcon}/> Скачать справку
        </Button>
      </Menu></div>
  }

  const setLessonsByCourseId = (id) => {
    store.getJournalLessons(id)
  }

  useEffect(() => {
    store.getAll('courses')
    store.getAll('lesson_types')
    store.getAll('lesson_infos')
    store.getLessonsInfos()
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.courseSelect}>
        <MultiSearchInput multi={false} handleChange={handleSelectCourse}
                          values={selectedCourse} label={'Выберите курс'}
                          items={coursesItems}/>
      </div>
      <div>
        {store.journalLessons.map((item, jIndex) => {
          const {lessonsByGroups} = item
          return <Paper key={jIndex + '0'} className={classes.objectBox}>
            <Typography component={'h6'} variant={'h6'}>{item.lesson_type}</Typography>
            {Object.keys(lessonsByGroups).map(key => {
              const group = groupsMap[key]
              const lessons = lessonsByGroups[key]
              return <div key={key} className={classes.groupTable}>
                <Typography component={'div'} className={classes.groupTitle}>{group.name}</Typography>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Ученик</TableCell>
                      {lessons.map((lesson, i) => <TableCell align={'center'}>
                        <div><VisibilityButton status={lesson.status} lessonId={lesson.id} journalIndex={jIndex}
                                               lessonIndex={i}/></div>
                        <div>{moment(lesson.start_time).format('DD.MM')}</div>
                      </TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      group.users.filter(item => item.role === 'user').map(user => {
                        return <TableRow>
                          <TableCell>{user.second_name} {user.first_name && user.first_name[0]}.{user.third_name && user.third_name[0]}.
                            ({user.email})</TableCell>
                          {lessons.map((lesson, lIndex) => {
                            const vIndex = lesson.visits.findIndex((item, ) => item.user_id === user.id)
                            return <TableCell style={{padding: '0'}}><VisitCell visit={lesson.visits[vIndex]} lIndex={lIndex}
                                                                                vIndex={vIndex} jIndex={jIndex}
                                                                                grpId={lesson.group_id}/></TableCell>
                          })}
                        </TableRow>
                      })
                    }
                  </TableBody>
                </Table>
              </div>
            })}
          </Paper>
        })}
      </div>
    </div>
  )
}

export default inject('store')(observer(JournalPage))
