import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { ReportDialog } from '../../dialogs'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { tableIcons, tableLocalization } from '../../../config/config'
import AddIcon from '@material-ui/icons/Email'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const moment = require('moment')

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
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
    fontStyle: 'italic',
    padding: 10,
    display: 'flex',
    backgroundColor: 'whitesmoke',
    flexDirection: 'column'
  },
  text: {
    padding: 10,
    marginLeft: 10,
    margin: 'auto 20px'
  },
  imgContainer: {
    display: 'flex',
    margin: '30px auto'
  }
}))

const getImgResources = (photos) => photos.map(item => ({
  original: item.url
}))

const ReportsTeacherPage = (props) => {
  const classes = useStyles()
  const [messageDialogIsOpen, setMessageDialogVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState({})
  const {store} = props

  const messageKinds = {
    offer: 'Предложение'
  }

  useEffect(() => {
    store.getUserObjects('outbox')
  }, [])

  const openMessageDialog = (message) => {
    setMessageDialogVisible(true)
    setCurrentMessage(message || {})
  }
  const closeMessageDialog = () => setMessageDialogVisible(false)

  return (
    <div className={classes.root}>
      <Typography component='div' className={classes.controlHeader}>
        <Button variant="contained" color="primary" className={classes.addButton} onClick={() => openMessageDialog()}>
          <AddIcon className={classes.leftIcon}/>
          Сообщение администратору
        </Button>
      </Typography>
      <MaterialTable
        className={classes.tableShortIcons}
        title="Мои обращения"
        icons={tableIcons}
        columns={[
          {title: 'Тема', field: 'head_text', type: 'text', filtering: false},
          {
            title: 'Отправлено',
            field: 'created_at',
            filtering: false,
            type: 'datetime',
            render: rowData => <div>{moment(rowData.created_at).format('DD.MM.YYYY HH:mm')}</div>
          }
        ]}
        data={store.outbox.filter(item => item.kind === 'report')}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        detailPanel={[
          {
            tooltip: 'Сообщение',
            render: rowData => {
              const images = getImgResources(rowData.photos)
              return (
                <div className={classes.description}>
                  <Paper className={classes.text}>{rowData.full_text}</Paper>
                  {rowData.photos.length ? <div className={classes.imgContainer}>
                    <ImageGallery showPlayButton={false} items={images}/>
                  </div> : null}
                </div>
              )
            }
          }
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
        }}
        localization={tableLocalization}
        editable={{
          onRowDelete: oldData => new Promise((resolve, reject) => store.deleteMessage(oldData.id).then(res => {
            store.removeInStore('outbox', oldData.id)
            resolve()
          }).catch(reject))
        }}
      />
      <ReportDialog handleClose={closeMessageDialog}
                    open={messageDialogIsOpen}/>
    </div>
  )
}

export default inject('store')(observer(ReportsTeacherPage))
