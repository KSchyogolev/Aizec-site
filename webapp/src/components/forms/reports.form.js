import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import { tableIcons } from '../../config/config'
import { tableLocalization } from '../../config/config'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import DoneIcon from '@material-ui/icons/Done'

const moment = require('moment')

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
  original: item.url,
  thumbnail: item.url
}))

const roleName = {
  admin: 'Администратор',
  teacher: 'Учитель',
  user: 'Ученик'
}

const ReportsPage = props => {
  const classes = useStyles()
  const {store} = props

  const messageKinds = {
    offer: 'Предложение'
  }

  const mapUsers = store.users.reduce((res, item) => ({...res, [item.id]: {...item}}), {})
  const mapGroups = store.groups.reduce((res, item) => ({...res, [item.id]: {...item}}), {})

  useEffect(() => {
    store.getAll('messages', message => message.kind === 'report' && message.status === 'active', 'reports', true)
    store.getAll('groups')
    store.getAll('users')
  }, [])

  return (
    <div className={classes.root}>
      <MaterialTable
        className={classes.tableShortIcons}
        title="Обращения"
        icons={tableIcons}
        columns={[
          {title: 'Тема', field: 'head_text', type: 'text'},
          {
            title: 'Создано',
            field: 'created_at',
            filtering: false,
            type: 'datetime',
            render: rowData => <div>{moment(rowData.created_at).format('DD.MM.YYYY HH:mm')}</div>
          },
          {
            title: 'Отправитель',
            field: 'from',
            filtering: false,
            type: 'text',
            render: rowData => `${mapUsers[rowData.user_id].second_name} ${mapUsers[rowData.user_id].first_name} (${mapUsers[rowData.user_id].email})`
          },
          {
            title: 'Роль отправителя',
            field: 'role',
            type: 'text',
            render: rowData => roleName[mapUsers[rowData.user_id].role],
            lookup: roleName,
            customFilterAndSearch: (term, rowData) => !term.length || term.indexOf(mapUsers[rowData.user_id].role) !== -1
          },
          {
            title: 'Статус',
            field: 'status',
            lookup: {'archived': 'Прочитано', 'active': 'Новое'}
          }
        ]}
        data={store.messages.filter(item => item.kind === 'report')}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        detailPanel={[
          {
            tooltip: 'Сообщение',
            render: rowData => {
              const images = getImgResources(rowData.photos)
              return (
                <div className={classes.description}>
                  {rowData.full_text}
                  {images.length ? <div className={classes.imgContainer}>
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
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        actions={[
          rowData => ({
            icon: () => <DoneIcon/>,
            tooltip: 'Пометить как прочитанное',
            onClick: (event, rowData) => store.updateMessage(rowData.id, {status: 'archived'}).then(() => {
              store.setStore('tips', {...store.tips, reports: store.tips.reports - 1})
            }),
            disabled: rowData.status !== 'active'
          })
        ]}
      />
    </div>
  )

}

export default inject('store')(observer(ReportsPage))
