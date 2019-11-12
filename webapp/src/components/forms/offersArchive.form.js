import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { tableIcons } from '../../config/config'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import NewIcon from '@material-ui/icons/FiberNew'
import { tableLocalization } from '../../config/config'
import ApproveUserIcon from '@material-ui/icons/HowToReg'
import RestoreIcon from '@material-ui/icons/Restore'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    // margin: '15px'
  },
  actionButton: {
    padding: '0!important'
  }
}))


const UsersArchiveForm = props => {
  const {store} = props
  const classes = useStyles()

  useEffect(() => {
    store.getArchived('messages', 'archivedOffers')
  }, [])

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Архивные предложения"
        icons={tableIcons}
        columns={[
          {
            title: 'Тип',
            field: 'kind',
            lookup: {'offer': 'Предложение', 'merch': 'Товар'}
          },
          {title: 'Заголовок', field: 'head_text'},
          {title: 'Текст', field: 'full_text', filtering: false},
          {title: 'Цена', field: 'cost', filtering: false}
        ]}
        data={store.archivedOffers.filter(item => item.kind === 'offer' || item.kind === 'merch')}
        actions={[
          {
            icon: () => <RestoreIcon/>,
            tooltip: 'Восстановить',
            onClick: (event, rowData) => store.updateMessage(rowData.id, {status: 'active'}).then(() => {
              store.showNotification('success', 'Предложение восстановлено')
              store.getArchived('messages', 'archivedOffers')
            })
          }
        ]}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          filtering: true
        }}
        localization={tableLocalization}
        editable={{
          // onRowDelete: oldData => new Promise((resolve, reject) => store.deleteMessage(oldData.id).then(resolve).catch(reject))
        }}
      />
    </div>
  )
}

export default inject('store')(observer(UsersArchiveForm))
