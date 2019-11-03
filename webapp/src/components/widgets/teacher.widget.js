import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    borderRadius: '200px 20px 20px 200px'
  },
  details: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  avatar: {
    width: 100,
    minWidth: 250,
    minHeight: 250,
    display: 'flex',
    borderRadius: 200
  },
  blocked: {
    backgroundColor: '#b5b5b5',
    opacity: 0.55,
    '& path': {
      fill: '#656565 !important'
    },
    '& polygon': {
      fill: '#656565 !important'
    },
    '& rect': {
      fill: '#656565 !important'
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
  },
  info: {
    maxHeight: 179,
    overflowY: 'auto'
  }
}))

const TeacherWidget = ({photo, name, info, ...props}) => {
  const classes = useStyles()

  return (
    <Card className={clsx(classes.card)}>
      <CardMedia
        className={classes.avatar}
        image={photo || require('../../static/images/user.jpg')}
        title="Contemplative Reptile"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.info}
                      dangerouslySetInnerHTML={{__html: info}}>
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        </div>
      </div>
    </Card>
  )
}

export default (TeacherWidget)
