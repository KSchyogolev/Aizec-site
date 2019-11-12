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
}, {
  name: 'Отзыв на Яндекс Картах - Комендантский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fklub_robototekhniki_azimov%2F35533392251%2F%3Fll%3D30.247045%252C60.008047%26oid%3D35533392251%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCXs0k3cnRj5AEdss4mQw801AEhIJeaMEAIDUtD8RWSbRtd2%252FsT8iBQABAgQFKAowADiF5MPq6%252B%252Bs%252Fb4BQAJIAVXNzMw%252BWABqAnJ1cACdAc3MTD2gAQCoAQA%253D%26sll%3D30.247045%252C60.008047%26sspn%3D0.019913%252C0.138215%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%26z%3D12&cc_key=',
  text: 'Стародеревенская ул., 36, ТЦ Крокус, эт. 2, оф. 17'
}, {
  name: 'Отзыв на Яндекс Картах - Гражданский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fazimov%2F80984338097%2F%3Fll%3D30.548037%252C60.029755%26oid%3D35533392251%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCXs0k3cnRj5AEdss4mQw801AEhIJeaMEAIDUtD8RWSbRtd2%252FsT8iBQABAgQFKAowADiQlabS4oHo7W5AAkgBVc3MzD5YAGoCcnVwAJ0BzcxMPaABAKgBAA%253D%253D%26sll%3D30.548037%252C60.029755%26sspn%3D0.162735%252C0.138124%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%26z%3D12&cc_key=',
  text: 'Гражданский просп., 111, эт. 2, оф. 225'
}, {
  name: 'Отзыв на Яндекс Картах - Гражданский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fazimov%2F80984338097%2F%3Fll%3D30.548037%252C60.029755%26oid%3D35533392251%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCXs0k3cnRj5AEdss4mQw801AEhIJeaMEAIDUtD8RWSbRtd2%252FsT8iBQABAgQFKAowADiQlabS4oHo7W5AAkgBVc3MzD5YAGoCcnVwAJ0BzcxMPaABAKgBAA%253D%253D%26sll%3D30.548037%252C60.029755%26sspn%3D0.162735%252C0.138124%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%26z%3D12&cc_key=',
  text: 'Стародеревенская ул., 36, ТЦ Крокус, эт. 2, оф. 17'
}, {
  name: 'Отзыв на Яндекс Картах - Электросила',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fklub_robototekhniki_azimov%2F18171806278%2F%3Fll%3D30.305051%252C59.883201%26oid%3D179073828590%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCUmFsYUgUz5AEZHDs0Y19k1AEhIJwWg9GW%252Ftxz8RpK3kiNBfxD8iBQABAgQFKAowADis%252FJWtlrSkigZAw64HSAFVzczMPlgAagJydXAAnQHNzEw9oAEAqAEA%26sll%3D30.305051%252C59.883201%26sspn%3D0.011437%252C0.079684%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%2520%25D0%25BA%25D0%25BB%25D1%2583%25D0%25B1%26z%3D12.8&cc_key=',
  text: 'ул. Решетникова, 15, эт. 4, оф. 454'
}, {
  name: 'Отзыв на Яндекс Картах - Комендантский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fklub_robototekhniki_azimov%2F35533392251%2F%3Fll%3D30.247045%252C60.008047%26oid%3D35533392251%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCXs0k3cnRj5AEdss4mQw801AEhIJeaMEAIDUtD8RWSbRtd2%252FsT8iBQABAgQFKAowADiF5MPq6%252B%252Bs%252Fb4BQAJIAVXNzMw%252BWABqAnJ1cACdAc3MTD2gAQCoAQA%253D%26sll%3D30.247045%252C60.008047%26sspn%3D0.019913%252C0.138215%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%26z%3D12&cc_key=',
  text: 'Стародеревенская ул., 36, ТЦ Крокус, эт. 2, оф. 17'
}, {
  name: 'Отзыв на Яндекс Картах - Лиговский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fklub_robototekhniki_azimov%2F71943563356%2F%3Fll%3D30.422234%252C59.924151%26oid%3D179073828590%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCUmFsYUgUz5AEZHDs0Y19k1AEhIJwWg9GW%252Ftxz8RpK3kiNBfxD8iBQABAgQFKAowADjn6Zqu4Z7s7fcBQMCeAUgBVc3MzD5YAGoCcnVwAJ0BzcxMPaABAKgBAA%253D%253D%26sll%3D30.422234%252C59.924151%26sspn%3D0.019913%252C0.138566%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%2520%25D0%25BA%25D0%25BB%25D1%2583%25D0%25B1%26z%3D12&cc_key=',
  text: 'Лиговский просп., 87, эт. 6, оф. 628'
}, {
  name: 'Отзыв на Яндекс Картах - Нарвская',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fklub_robototekhniki_azimov%2F100571969919%2F%3Fll%3D30.294285%252C59.896656%26oid%3D179073828590%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCUmFsYUgUz5AEZHDs0Y19k1AEhIJwWg9GW%252Ftxz8RpK3kiNBfxD8iBQABAgQFKAowADjkyOix4fLIhZMBQLauB0gBVc3MzD5YAGoCcnVwAJ0BzcxMPaABAKgBAA%253D%253D%26sll%3D30.294285%252C59.896656%26sspn%3D0.077816%252C0.031200%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%2520%25D0%25BA%25D0%25BB%25D1%2583%25D0%25B1%26z%3D14.17&cc_key=',
  text: 'Нарвский просп., 18, эт. 4, оф. 454'
}, {
  name: 'Отзыв на Яндекс Картах - Проспект Ветеранов',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fyandex.ru%2Fmaps%2Forg%2Fklub_robototekhniki_azimov%2F33257956182%2F%3Fll%3D30.213712%252C59.835455%26oid%3D33257956182%26ol%3Dbiz%26sctx%3DZAAAAAgBEAAaKAoSCXs0k3cnRj5AEdss4mQw801AEhIJeaMEAIDUtD8RWSbRtd2%252FsT8iBQABAgQFKAowADjt2obGzs3NoXBAvJ4BSAFVzczMPlgAagJydXAAnQHNzEw9oAEAqAEA%26sll%3D30.213712%252C59.835455%26sspn%3D0.019913%252C0.138938%26text%3D%25D0%25B0%25D0%25B7%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%26z%3D12&cc_key=',
  text: 'ул. Бурцева, 23, эт. 1'
}, {
  name: 'Отзыв на Google Картах - Васильевский остров',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fg.page%2FAzimovClub3%3Fshare&cc_key=',
  text: 'Средний просп. Васильевского острова, 36/40, БЦ Остров, эт. 3, оф. 504'
}, {
  name: 'Отзыв на Google Картах - Комендантский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fg.page%2FAzimovClub4%3Fshare&cc_key=',
  text: 'Стародеревенская ул., 36, ТЦ Крокус, эт. 2, оф. 17'
}, {
  name: 'Отзыв на Google Картах - Гражданский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fg.page%2FAzimovClub5%3Fshare&cc_key=',
  text: 'Гражданский просп., 111, эт. 2, оф. 225'
}, {
  name: 'Отзыв на Google Картах - Электросила',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fg.page%2FAzimovClub1%3Fshare&cc_key=',
  text: 'ул. Решетникова, 15, эт. 4, оф. 454'
}, {
  name: 'Отзыв на Google Картах - Лиговский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fg.page%2FAzimovClub1%3Fshare&cc_key=',
  text: 'Лиговский просп., 87, эт. 6, оф. 628'
}, {
  name: 'Отзыв на Google Картах - Нарвская',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fg.page%2FAzimovClub2%3Fshare&cc_key=',
  text: 'Нарвский просп., 18, эт. 4, оф. 454'
}, {
  name: 'Отзыв на Google Картах - Проспект Ветеранов',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fg.page%2FAzimovClub6%3Fshare&cc_key=',
  text: 'ул. Бурцева, 23, эт. 1'
}, {
  name: 'Отзыв на 2ГИС - Васильевский остров',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fgo.2gis.com%2Ffgl5bm&cc_key=',
  text: 'Средний просп. Васильевского острова, 36/40, БЦ Остров, эт. 3, оф. 504'
}, {
  name: 'Отзыв на 2ГИС - Комендантский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fgo.2gis.com%2Fcn7ez&cc_key=',
  text: 'Стародеревенская ул., 36, ТЦ Крокус, эт. 2, оф. 17'
}, {
  name: 'Отзыв на 2ГИС - Гражданский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fgo.2gis.com%2Fr9iwg&cc_key=',
  text: 'Гражданский просп., 111, эт. 2, оф. 225'
}, {
  name: 'Отзыв на 2ГИС - Электросила',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fgo.2gis.com%2Fscb6ai&cc_key=',
  text: 'ул. Решетникова, 15, эт. 4, оф. 454'
}, {
  name: 'Отзыв на 2ГИС - Лиговский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fgo.2gis.com%2Fzqif5&cc_key=',
  text: 'Лиговский просп., 87, эт. 6, оф. 628'
}, {
  name: 'Отзыв на 2ГИС - Нарвская',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fgo.2gis.com%2F8qq4p9&cc_key=',
  text: 'Нарвский просп., 18, эт. 4, оф. 454'
}, {
  name: 'Отзыв на 2ГИС - Проспект Ветеранов',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fgo.2gis.com%2Fvjj45&cc_key=',
  text: 'ул. Бурцева, 23, эт. 1'
}, {
  name: 'Отзыв в группе ВКонтакте',
  count: 200,
  link: 'https://vk.com/topic-106126148_33048974',
  text: ''
}, {
  name: 'Отзыв на Zoon - Васильевский остров',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fspb.zoon.ru%2Fentertainment%2Fklub_robototehniki_azimov_na_metro_vasileostrovskaya%2F&cc_key=',
  text: 'Средний просп. Васильевского острова, 36/40, БЦ Остров, эт. 3, оф. 504'
}, {
  name: 'Отзыв на Zoon - Комендантский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fspb.zoon.ru%2Fentertainment%2Fklub_robototehniki_azimov_na_metro_komendantskij_prospekt%2F&cc_key=',
  text: 'Стародеревенская ул., 36, ТЦ Крокус, эт. 2, оф. 17'
}, {
  name: 'Отзыв на Zoon - Гражданский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fspb.zoon.ru%2Fentertainment%2Fklub_robototehniki_azimov_na_metro_grazhdanskij_prospekt%2F&cc_key=',
  text: 'Гражданский просп., 111, эт. 2, оф. 225'
}, {
  name: 'Отзыв на Zoon - Электросила',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fspb.zoon.ru%2Fentertainment%2Fklub_robototehniki_azimov_na_metro_elektrosila%2F&cc_key=',
  text: 'ул. Решетникова, 15, эт. 4, оф. 454'
}, {
  name: 'Отзыв на Zoon - Лиговский проспект',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fspb.zoon.ru%2Fentertainment%2Fklub_robototehniki_azimov_na_metro_ligovskij_prospekt%2F&cc_key=',
  text: 'Лиговский просп., 87, эт. 6, оф. 628'
}, {
  name: 'Отзыв на Zoon - Нарвская',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fspb.zoon.ru%2Fentertainment%2Fklub_robototehniki_azimov_na_metro_narvskaya%2F&cc_key=',
  text: 'Нарвский просп., 18, эт. 4, оф. 454'
}, {
  name: 'Отзыв на Zoon - Проспект Ветеранов',
  count: 200,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fspb.zoon.ru%2Fentertainment%2Fklub_robototehniki_azimov_na_metro_prospekt_veteranov%2F&cc_key=',
  text: 'ул. Бурцева, 23, эт. 1'
}, {
  name: 'Активность на странице клуба в Instagram',
  count: 100,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fwww.instagram.com%2Fazimovclub%2F&cc_key=',
  text: ''
}, {
  name: 'Подписка на страницу клуба в Instagram',
  count: 100,
  link: 'https://vk.com/away.php?to=https%3A%2F%2Fwww.instagram.com%2Fazimovclub%2F&cc_key=',
  text: ''
}, {
  name: 'Пригласить друга',
  count: 1000,
  link: '',
  text: '1000 бонусов пригласившему и приглашенному. За второго друга - 2000 пригласившему и 1000 приглашенному, за третьего - 3000 приглашенному и 1000 пригласившему и т.д.'
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
