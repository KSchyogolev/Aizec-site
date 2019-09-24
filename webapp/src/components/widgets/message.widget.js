import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BuyDialog, OfferInfoDialog } from '../dialogs'
import Card from '@material-ui/core/Card'
import clsx from 'clsx'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import DoneIcon from '@material-ui/icons/Done'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: 'left'
  },
  media: {
    height: 140
  },
  cost: {
    color: '#607D8B',
    fontSize: '1.2rem'
  },
  rightAction: {
    marginLeft: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  newOffer: {
    backgroundColor: '#d5ffdc'
  }
}))

const translate = {
  regular: 'Регулярный курс',
  offer: 'Предложение',
  intensive: 'Интенсивный курс',
  merch: 'Мерчендайз'
}

const widgetImg = {
  offer: require('../../static/images/offer_card.jpg'),
  product: require('../../static/images/intensive_card.jpg'),
  intensive: require('../../static/images/intensive_card.jpg'),
  course: require('../../static/images/regular_card.jpg'),
  regular: require('../../static/images/regular_card.jpg')
}

/*const images = [
  {url: 'https://picsum.photos/id/1018/1000/600/'},
  {url: 'https://picsum.photos/id/1015/1000/600/'},
  {url: 'https://picsum.photos/id/1019/1000/600/'}
]*/

const MessageWidget = ({kind, head_text, full_text, index, merch_id, course_id, message_id, images, cost, isNew, status, ...props}) => {
  const classes = useStyles()
  const [openBuy, setBuyDialogOpen] = useState(false)
  const [openInfo, setInfoDialogOpen] = useState(false)

  const [expanded, setExpanded] = React.useState(false)

  function handleExpandClick () {
    setExpanded(!expanded)
  }

  const handleCloseBuy = () => setBuyDialogOpen(false)
  const handleOpenBuy = () => setBuyDialogOpen(true)

  const handleCloseInfo = () => setInfoDialogOpen(false)
  const handleOpenInfo = () => setInfoDialogOpen(true)

  const getIconByStatus = (status) => {
    switch (status) {
      case 'ready':
        return <Tooltip title="Заявка на покупку в обработке" aria-label="add">
          <DoneIcon style={{color: '#668bc5', margin: 9}}/>
        </Tooltip>
      case 'done' :
        return <Tooltip title="Товар приобретен" aria-label="add">
          <DoneAllIcon style={{color: '#73c56e', margin: 9}}/>
        </Tooltip>
      default:
        return <IconButton onClick={handleOpenBuy}>
          <AddShoppingCartIcon/>
        </IconButton>
    }
  }

  return (
    <Card className={clsx(classes.card, isNew && classes.newOffer)} key={index}>
      <CardActionArea onClick={handleOpenInfo}>
        <CardMedia
          className={classes.media}
          image={images.length ? images[0].url : widgetImg[kind]}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {head_text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {translate[kind]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {getIconByStatus(status)}
        {cost ? <span className={classes.cost}>{cost},00 руб.</span> : null}
        {/*          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>*/}
      </CardActions>
      {/*        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {full_text}
            </Typography>
          </CardContent>
        </Collapse>*/}
      <BuyDialog handleClose={handleCloseBuy} open={openBuy} name={head_text} merch_id={merch_id} course_id={course_id}
                 cost={cost}
                 message_id={message_id}/>
      <OfferInfoDialog handleClose={handleCloseInfo} open={openInfo} title={head_text} text={full_text}
                       images={images}/>
    </Card>
  )

}

export default (MessageWidget)
