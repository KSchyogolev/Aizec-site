import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons, tableLocalization } from '../../config/config'
import GetBonusesIcon from '@material-ui/icons/Replay10'
import { ReportDialog, BonusesDialog } from '../dialogs'
const useStyles = makeStyles(theme => ({
  root: {},
  controlHeader: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  addButton: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}))

const bonuses = [{
  name: '',
  count: 200,
  link: '',
  text: ''
}]

const BonusesForm = props => {
  const classes = useStyles()
  const {store} = props
  const [bonusesDialogVisible, setBonusesDialogVisible] = useState(false)
  const [reportDialogVisible, setReportDialogVisible] = useState(false)

  const openBonusesDialog = () => {
    setBonusesDialogVisible(true)
  }

  const closeBonusesDialog = () => {
    setBonusesDialogVisible(false)
  }

  const openReportDialog = () => {
    setReportDialogVisible(true)
  }

  const closeReportDialog = () => {
    setReportDialogVisible(false)
  }

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Бонусы"
        icons={tableIcons}
        columns={[
          {title: 'Описаение', field: 'name'},
          {title: 'Количество бонусов', field: 'count'}
        ]}
        data={bonuses}
        actions={[
          {
            icon: () => <GetBonusesIcon/>,
            tooltip: 'Получить бонусы',
            onClick: (e, rowData) => openBonusesDialog(rowData)
          }
        ]}
        options={{
          pageSize: 15,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1
        }}
        localization={tableLocalization}
      />
      <ReportDialog handleClose={closeBonusesDialog}
                    isUser={true}
                    open={reportDialogVisible}/>
      <ReportDialog handleClose={closeBonusesDialog}
                    isUser={true}
                    open={reportDialogVisible}/>
    </div>
  )

}

export default inject('store')(observer(BonusesForm))
