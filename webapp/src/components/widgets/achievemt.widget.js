import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex'
  },
  details: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 100,
    minWidth: 120,
    minHeight: 120,
    display: 'flex',
    '& svg' :{
      width: 100,
      height: 100,
      margin: 'auto',
      borderRadius:10,
      background: '#ececec',
      padding: 15
    }
  },
  blocked: {
    backgroundColor: '#b5b5b5',
    opacity: 0.55,
    '& path':{
      fill: '#656565 !important',
    },
    '& polygon':{
      fill: '#656565 !important',
    },
    '& rect':{
      fill: '#656565 !important',
    }
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}))

const AchievementWidget = ({icon, text, title, active = false, ...props}) => {
  const classes = useStyles()

  return (
    <Card className={clsx(classes.card,!active && classes.blocked)}>
      <CardMedia className={classes.cover}>
        {icon}
      </CardMedia>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {text}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        </div>
      </div>
    </Card>
  )
}

export default (AchievementWidget)
