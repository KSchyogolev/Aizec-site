import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from 'material-table'
import { tableIcons, tableLocalization } from '../../config/config'
import GetBonusesIcon from '@material-ui/icons/FiberSmartRecord'
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
  name: 'Активность в сообществе клуба ВКонтакте',
  count: 100,
  link: 'https://vk.com/azimovclub',
  text: ''
}, {
  name: 'Отзыв на Яндекс Картах - Васильевский остров',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fazimov%2F179073828590%2F%3Fll%3D30.275920%252C59.942101%26oid%3D179073828590%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCUv2vYUgUz5AEd6UrkY19k1AEhIJAAQvGW%252Ftxz8RAOLUiNBfxD8iBQABAgQFKAowADis29rzssKO%252FENAAkgBVc3MzD5YAGoCcnVwAJ0BzcxMPaABAKgBAA%253D%253D%26sll%3D30.275920%252C59.942101%26sspn%3D0.019913%252C0.138491%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%2520%25D0%25BA%25D0%25BB%25D1%2583%25D0%25B1%26z%3D12&cc_key=',
  text: 'Средний просп. Васильевского острова, 36/40, БЦ Остров, эт. 3, оф. 504'
}]

const BonusesForm = props => {
  const classes = useStyles()
  const {store} = props
  const [bonusesDialogVisible, setBonusesDialogVisible] = useState(false)
  const [reportDialogVisible, setReportDialogVisible] = useState(false)
  const [bonus, setBonus] = useState({})
  const [message, setMessage] = useState({})

  const openBonusesDialog = (data) => {
    setBonus(data)
    setBonusesDialogVisible(true)
  }

  const closeBonusesDialog = () => {
    setBonusesDialogVisible(false)
  }

  const openReportDialog = () => {
    setMessage({
      head_text: 'Получить бонусы',
      full_text: `Хочу получить ${bonus.count || ''} бонусов за ${bonus.name || ''}`
    })
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
      <BonusesDialog handleClose={closeBonusesDialog}
                     open={bonusesDialogVisible} {...bonus}
                     handleProof={openReportDialog}/>
      <ReportDialog handleClose={closeReportDialog}
                    isUser={true}
                    defaultMessage={message}
                    open={reportDialogVisible}/>
    </div>
  )

}

export default inject('store')(observer(BonusesForm))
