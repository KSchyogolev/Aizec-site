import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { MessageWidget } from '../../widgets'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { TabPanel, a11yProps } from '../index'
import { BonusesForm } from '../../forms'

const bonusRules = [
  {
    image: 'robot.jpg',
    title: 'скидка на обучение',
    paragraphs: ['500 бонусов = 500 руб. скидки', '1000 бонусов = 1000 руб. скидки', '1500 бонусов = 1500 руб. скидки', '...', 'и так далее до бесконечности !'],
    bottom: ''
  },
  {
    image: 'tank.gif',
    title: 'Тренировочный бот "mark-4 руби"',
    paragraphs: ['Комплектация "STANDART" - 7800 бонусов', 'Комплектация "TESLA" - 8600 бонусов', 'Комплектация "DELUXE" - 9900 бонусов'],
    bottom: '*Информацию о составе комплектаций смотрите в нашей группе Вконтакте в разделе "Товары"'
  },
  {
    image: 'znatok.jpg',
    title: 'Электронный конструктор "Знаток" 320 схем',
    paragraphs: ['3500 бонусов'],
    bottom: ''
  },
  {
    image: 'merch.jpg',
    title: 'Фирменная продукция "АЗИМОВ"',
    paragraphs: ['Термокружка "Азимов" - 500 бонусов', 'Фирменная футболка "Азимов" - 1000 бонусов'],
    bottom: '*Внешний вид продукции мржет отличаться от представленной'
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '15px'
  },
  fullLoader: {
    left: '50%',
    top: '40%',
    width: '50px !important',
    height: '50px !important',
    position: 'absolute'
  },
  fullVideo: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    minWidth: '100%',
    minHeight: '100%',
    zIndex: -1
  },
  offersBar: {
    background: 'none',
    boxShadow: 'none',
    '& .MuiTabs-indicator': {
      background: 'none'
    },
    '& .MuiTab-root': {
      borderRadius: 5,
      backgroundColor: '#757575',
      margin: 10
    },
    '& .Mui-selected': {
      backgroundColor: '#FF5722',
      opacity: 0.8
    }
  },
  offersHeader: {
    // display: 'flex'
  },
  header: {
    textTransform: 'uppercase !important',
    padding: 10
  },
  mainPaper: {
    color: '#212121'
    /*    border: '3px solid #fe784d',
        borderRadius: 10,
        padding: 30*/
  },
  card: {
    margin: 15,
    display: 'flex'
  },
  bottom: {
    marginTop: 40,
    fontSize: '0.85em'
  },
  media: {
    height: 300,
    width: 300,
    margin: 10
  },
  details: {
    margin: 'auto'
  }
}))

const OffersUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  const [value, setValue] = React.useState(0)

  function handleChange (event, newValue) {
    setValue(newValue)
  }

  const BonusCard = ({title, paragraphs, image, bottom, ...props}) => (
    <Card className={classes.card}>
      {image && <CardMedia
        className={classes.media}
        image={require(`../../../static/images/${image}`)}
        title="Contemplative Reptile"
      />}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.header}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {paragraphs && paragraphs.map(item => <div>{item}</div>)}
          </Typography>
          {bottom && <Typography className={classes.bottom}>
            {bottom}
          </Typography>}
        </CardContent>
      </div>
    </Card>
  )

  return (
    <div>
      <div className={classes.offersHeader}>
        <AppBar position="static" className={classes.offersBar}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Правила" {...a11yProps(0)} />
            <Tab label="Получить бонусы" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Typography className={classes.mainPaper}>
            <div className={classes.header}>
              <h2>Как можно потратить заработанные бонусы?</h2>
              <h3>1 бонус = 1 рубль</h3>
            </div>
            {
              <Grid container spacing={3}>
                {bonusRules.map((item, index) => <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  key={index}><BonusCard {...item}/>
                </Grid>)}
              </Grid>
            }
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BonusesForm/>
        </TabPanel>
      </div>

    </div>
  )
}

export default inject('store')(observer(OffersUserPage))
