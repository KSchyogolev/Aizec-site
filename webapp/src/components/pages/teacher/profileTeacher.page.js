import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import store from '../../../store'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import AddPhotoIcon from '@material-ui/icons/AddAPhoto'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 15
  },
  form: {
    padding: 30
  },
  card: {
    textAlign: 'left',
    color: '#212121'
  },
  media: {
    height: '12em'
  },
  profileTable: {},
  infoRow: {
    display: 'flex',
    '& div:first-child': {
      fontWeight: 600,
      width: 200
    },
    '& div:last-child': {
      color: '#607D8B'
      // marginLeft: 'auto'
    }
  },
  info: {
    margin: '30px 0px'
  },
  parentMedia: {
    height: '5em'
  },
  parentsForm: {
    // marginTop: 100
    padding: 30
  },
  avatar: {
    width: 100,
    minWidth: 250,
    minHeight: 250,
    display: 'flex',
    borderRadius: 200,
    border: '3px solid #ff5722',
    margin: 20
  },
  input: {
    display: 'none'
  },
  conttolPanel: {
    display: 'flex',
    '& span': {
      margin: 10
    }
  },
  margin: {
    margin: 'auto 10px'
  }
}))

const ProfilePage = (props) => {
  const classes = useStyles()
  const {store} = props
  const {currentUser: user} = store
  const [editMode, setEditMode] = useState(false)
  const [bio, setBio] = useState(user.bio)

  const handleChange = (e) => {
    setBio(e.target.value)
  }

  const saveUserInfo = (bio) => {
    store.updateCurrentUser({bio: bio}).then(res => {
      store.showNotification('success', 'Информация сохранена')
      setEditMode(false)
    })
  }

  const onChangeFileHandler = (e, userId) => {
    const files = e.target.files
    if (files.length > 0) {
      store.uploadImages(files, userId, 'user', 'users', 'photo', true).then(res => {
        store.showNotification('success', 'Аватар обновлен')
        localStorage.setItem('current_user', JSON.stringify(res.data))
        store.currentUser = res.data
        // this.setTip('currentVisits', (visit) => visit.approve_status === "null", 'homeworkUser')
      }).catch(e => {
        store.showNotification('error', 'Произошла ошибка при обновлении аватара')
      })
    }
  }

  const UploadAvatarButton = ({userId}) => {
    const classes = useStyles()
    const id = `icon-button-file-${userId}`
    return <div className={classes.detailsButton}>
      <input accept="image/*" className={classes.input} id={id} type="file"
             onChange={file => onChangeFileHandler(file, userId)}/>
      <label htmlFor={id}>
        <Tooltip title="Загрузить новое фото профиля" aria-label="add">
          <Fab size="small"
               component={'span'}>
            <AddPhotoIcon/>
          </Fab>
        </Tooltip>
      </label>
    </div>
  }
  console.log(user.photo)
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media} s
          image={require('../../../static/images/profile_background.jpg')}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <div className={classes.conttolPanel}>
            <Typography variant="h4" component="h2" className={classes.margin}>
              {user.second_name} {user.first_name} {user.third_name}
            </Typography>
            {editMode ? <Fab size="small" component={'span'}
                             onClick={() => {saveUserInfo(bio)}}>
              <SaveIcon/>
            </Fab> : <Tooltip title="Редактировать информацию" aria-label="add"><Fab size="small" component={'span'}
                                                                                     onClick={() => {setEditMode(true)}}>
              <EditIcon/>
            </Fab></Tooltip>}
            <UploadAvatarButton userId={user.id}/>
          </div>

          <Divider/>

          <CardMedia
            className={classes.avatar}
            image={user.photo || require('../../../static/images/user.jpg')}
            title="Contemplative Reptile"
          />
          {/*
          <Typography component={'div'} className={classes.info}>
            <div className={classes.infoRow}>
              <div>Почта</div>
              <div>{user.email}</div>
            </div>
          </Typography>*/}
          <div className={classes.info}>
            <h3>Информация </h3>
            {editMode ? <TextField value={bio} multiline={true} onChange={handleChange} fullWidth/> :
              <div dangerouslySetInnerHTML={{__html: user.bio}}></div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )

}

export default inject('store')(observer(ProfilePage))
