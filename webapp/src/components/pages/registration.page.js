import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { ChildInfoForm, ParentInfoForm } from '../forms'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  finalMessage: {
    padding: 40,
    borderRadius: 10,
    height: 120,
    position: 'relative'
  },
  link: {
    '& input': {
      display: 'none'
    }
  },
  rulesForm: {
    display: 'flex',
    position: 'absolute',
    bottom: 0
  }
}))

const UserRulesDialog = ({open, handleClose}) => <Dialog open={open} onClose={handleClose}
                                                         aria-labelledby="form-dialog-title" maxWidth={'md'}>
  <DialogTitle id="form-dialog-title">Пользоветельское соглашение</DialogTitle>
  <DialogContent>
    <DialogContentText>
      <h3>Политика в отношении обработки персональных данных</h3>

      <h4>1. Общие положения</h4>
      <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона
        от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по
        обеспечению безопасности персональных данных ИП Краснорудский Вадим Андреевич (далее – Оператор).</p>
      <p>1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод
        человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность
        частной жизни, личную и семейную тайну.</p>
      <p>2. Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко
        всей информации, которую Оператор может получить о посетителях веб-сайта http://azimov-school.com/</p>

      <h4>2. Основные понятия, используемые в Политике</h4>
      <p>1. Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств
        вычислительной техники;</p>
      <p>2. Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением
        случаев, если обработка необходима для уточнения персональных данных);</p>
      <p>3. Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных,
        обеспечивающих их доступность в сети интернет по сетевому адресу http://azimov-school.com/</p>
      <p>4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных, и
        обеспечивающих их обработку информационных технологий и технических средств;</p>
      <p>5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования
        дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту
        персональных данных;</p>
      <p>6. Обработка персональных данных – любое действие (операция) или совокупность действий (операций), совершаемых
        с использованием средств автоматизации или без использования таких средств с персональными данными, включая
        сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение,
        использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление,
        уничтожение персональных данных;</p>
      <p>7. Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или
        совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также
        определяющие</p>
      <p>цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции),
        совершаемые с персональными данными;</p>
      <p>8. Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или определяемому
        Пользователю веб-сайта http://azimov-school.com/; 9. Пользователь – любой посетитель веб-сайта
        http://azimov-school.com/;</p>
      <p>10. Предоставление персональных данных – действия, направленные на раскрытие персональных данных определенному
        лицу или определенному кругу лиц;</p>
      <p>11. Распространение персональных данных – любые действия, направленные на раскрытие персональных данных
        неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными
        неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации,
        размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным
        каким-либо иным способом;</p>
      <p>12. Трансграничная передача персональных данных – передача персональных данных на территорию иностранного
        государства органу власти иностранного государства, иностранному физическому или иностранному юридическому
        лицу;</p>
      <p>13. Уничтожение персональных данных – любые действия, в результате которых персональные данные уничтожаются
        безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе
        персональных данных и (или) результате которых уничтожаются материальные носители персональных данных.</p>

      <h4>3. Оператор может обрабатывать следующие персональные данные Пользователя</h4>
      <p>1. Фамилия, имя, отчество;</p>
      <p>2. Электронный адрес;</p>
      <p>3. Номера телефонов;</p>
      <p>4. Год, месяц, дата и место рождения;</p>
      <p>5. Имя, возраст ребенка; Правовой статус регистрирующегося по отношению к ребенку;</p>
      <p>6. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с
        помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).</p>
      <p>7. Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.</p>
      <p>4. Цели обработки персональных данных</p>

      <h4>1. Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки
        электронных писем; заключение, исполнение и прекращение гражданско-правовых договоров; предоставление доступа
        Пользователю к сервисам, информации и/или материалам, содержащимся на веб-</h4>
      <p>сайте; идентификация Пользователя, зарегистрированного на сайте для его дальнейшей авторизации; установление с
        Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования сайта,
        обработки запросов и заявок от Пользователя; определение места нахождения Пользователя для обеспечения
        безопасности, предотвращения мошенничества; подтверждение достоверности и полноты персональных данных,
        предоставленных Пользователем; создание учетной записи Пользователю для использования частей сайта;
        предоставление Пользователю эффективной технической поддержки при возникновении проблем, связанных с
        использованием сайта; предоставление Пользователю специальных предложений, новостной рассылки и иных сведений от
        имени сайта.</p>
      <p>2. Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных
        предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений,
        направив Оператору письмо на адрес электронной почты admin@azimov-school.com с пометкой «Отказ от уведомлениях о
        новых продуктах и услугах и специальных предложениях».</p>
      <p>3. Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора
        информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.</p>

      <h4>5. Правовые основания обработки персональных данных</h4>
      <p>1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки
        Пользователем самостоятельно через специальные формы, расположенные на сайте http://azimov-school.com/. Заполняя
        соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с
        данной Политикой.</p>
      <p>2. Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера
        Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).</p>
      <p>6. Порядок сбора, хранения, передачи и других видов обработки персональных данных Безопасность персональных
        данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и
        технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области
        защиты персональных данных.</p>
      <p>1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к
        персональным данным неуполномоченных лиц.</p>
      <p>2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за
        исключением случаев, связанных с исполнением действующего законодательства.</p>
      <p>3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно,
        путем направления Оператору уведомление на адрес электронной почты Оператора admin@azimov-school.com с пометкой
        «Актуализация персональных данных».</p>
      <p>4. Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое
        согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на
        электронный адрес Оператора admin@azimov-school.com с пометкой «Отзыв согласия на обработку персональных
        данных»</p>

      <h4>7. Трансграничная передача персональных данных</h4>
      <p>1. Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что
        иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных,
        обеспечивается надежная защита прав субъектов персональных данных.</p>
      <p>2. Трансграничная передача персональных данных на территории иностранных государств, не отвечающих
        вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме субъекта
        персональных данных на трансграничную передачу его персональных данных и/или исполнения договора, стороной
        которого является субъект персональных данных.</p>

      <h4>8. Заключительные положения</h4>
      <p>1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его
        персональных данных, обратившись к Оператору с помощью электронной почты admin@azimov-school.com.</p>
      <p>2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором.
        Политика действует бессрочно до замены ее новой версией.</p>
      <p>3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу
        http://azimovclub.tilda.ws/privacy_policy.</p>
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Закрыть
    </Button>
  </DialogActions>
</Dialog>

const SendDataForm = props => {
  const classes = useStyles()
  const [usersRulesIsOpen, setVisibleDialog] = useState(false)

  const openRulesDialog = () => setVisibleDialog(true)
  const closeRulesDialog = () => setVisibleDialog(false)

  return <div className={classes.finalMessage}>
    <Typography variant="h5" component="h5">
      Проверьте все данные перед отправкой
    </Typography>
    <Typography component="p">
      Внесение изменений, до подтверждения анкеты, запрещено
    </Typography>
    <Typography component="div" className={classes.rulesForm}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkRules}
            onChange={(e) => props.setRules(e.target.value)}
            value="checkRules"
            color="primary"
          />
        }
        label="Я принимаю пользовательское соглашение"
      />
      <Button href="#text-buttons" className={classes.link} onClick={openRulesDialog}>
        Подробнее...
      </Button>
    </Typography>
    <UserRulesDialog open={usersRulesIsOpen} handleClose={closeRulesDialog}/>
  </div>
}

const steps = ['Родитель', 'Ребенок', 'Подтверждение']

const getStepContent = (step, props) => {
  switch (step) {
    case 0:
      return <ParentInfoForm {...props}/>
    case 1:
      return <ChildInfoForm {...props}/>
    case 2:
      return <SendDataForm {...props}/>
    default:
      throw new Error('Unknown step')
  }
}

const Registration = props => {

  const classes = useStyles()
  const storedUser = localStorage.getItem('current_user')
  const initialUser = (storedUser && JSON.parse(storedUser)) || {}
  const isRegistered = initialUser && initialUser.status === 'not_approved'
  initialUser.parents = [{}]
  const [activeStep, setActiveStep] = useState(isRegistered ? steps.length : 0)
  const [currentUser, setUser] = useState(initialUser)
  const [checkRules, setCheckRules] = useState(false)

  const setRules = (value) => setCheckRules(value)

  const handleChange = (e) => {
    const {target: {name, value}} = e
    setUser({...currentUser, [name]: value})
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const parseParentUser = {...currentUser, parents: JSON.stringify(currentUser.parents)}
      props.store.activateUser(parseParentUser).then(res => {
        setActiveStep(activeStep + 1)
        localStorage.setItem('current_user', JSON.stringify(res))
      })
      return
    }
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  if (activeStep === steps.length) {
    localStorage.clear()
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Регистрация
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Регистрация завершена
                </Typography>
                <Typography variant="subtitle1">
                  Ваша заявка ожидает подтверждения, зайдите в личный кабинет позже.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, {handleChange, user: currentUser, setRules, checkRules})}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color={'primary'}
                    onClick={handleNext}
                    className={classes.button}
                    disabled={!checkRules && activeStep === steps.length - 1}
                  >
                    {activeStep === steps.length - 1 ? 'Отправить данные' : 'Далее'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}

export default inject('store')(observer(Registration))
