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
// import NewIcon from '@material-ui/icons/FiberNew'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'

const NewIcon = ({className}) => <svg className={className} version="1.1" id="Layer_1"
                                      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                      viewBox="0 0 512 512" style={{'enable-background': 'new 0 0 512 512'}}>
  <path style={{fill: '#FF5722'}} d="M512,256.8l-67.2-54.224l43.2-74.96l-91.2-7.968l-8-87.728L312,68.608L259.2,0l-49.6,70.176
	l-80-41.472l-4.8,90.928l-89.6,4.784l33.6,86.128L0,252.016l70.4,52.64l-35.2,74.96l88,9.568l4.8,89.328l81.6-38.288L264,512
	l48-71.776l75.2,36.688l6.4-89.328l88-1.6l-32-73.376L512,256.8z"/>
  <g>
    <path style={{fill: '#FFFFFF'}} d="M152.992,324.512l-31.584-90.24l23.824-8.336l30.32,26.512c8.688,7.632,17.968,17.008,25.568,25.776
		l0.4-0.144c-5.52-11.456-10.192-23.504-14.912-37.008l-9.232-26.384l18.736-6.544l31.584,90.24l-21.424,7.504l-31.456-28.064
		c-8.736-7.76-18.704-17.36-26.832-26.368l-0.336,0.272c4.704,11.728,9.424,24.352,14.56,39.072l9.52,27.184L152.992,324.512z"/>
    <path style={{fill: '#FFFFFF'}} d="M250.816,260.832c3.632,8.208,13.312,9.312,22.848,5.984c6.96-2.432,12.256-5.36,17.12-9.008
		l7.504,12.848c-5.744,5.024-13.456,9.232-22.288,12.336c-22.224,7.776-39.44-0.624-46.624-21.104
		c-5.792-16.592-1.904-38.544,20.848-46.512c21.152-7.408,34.96,6.256,40.624,22.448c1.216,3.472,1.904,6.704,2.16,8.272
		L250.816,260.832z M269.904,238.528c-1.728-4.96-6.784-12.496-16.16-9.216c-8.56,3.008-9.328,11.968-7.936,17.664L269.904,238.528z
		"/>
    <path style={{fill: '#FFFFFF'}} d="M305.376,197.712l14.576,24.944c3.728,6.352,7.616,13.12,11.296,20.256l0.272-0.096
		c-1.28-7.968-2.048-16.128-2.672-23.104l-2.464-29.344l16.08-5.632l15.68,23.808c4.32,6.752,8.64,13.52,12.608,20.528l0.256-0.096
		c-1.664-7.808-2.912-15.664-4.064-23.664l-3.472-27.952l19.968-6.992l2.816,72.496l-19.136,6.704l-14.224-20.88
		c-3.856-5.856-7.136-11.328-11.264-18.896l-0.288,0.096c1.664,8.576,2.416,15.072,2.848,21.84l1.488,25.328l-19.136,6.704
		l-41.904-58.832L305.376,197.712z"/>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
</svg>

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
  rightIcon: {
    marginLeft: 'auto',
    width: '3em',
    height: '3em'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  newOffer: {
    border: '2px solid #ff572261'
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
    <Card className={clsx(classes.card)} key={index}> {/*, isNew && status !== 'done' && classes.newOffer*/}
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
        {isNew ? <Tooltip title="Новинка" aria-label="add">
          <NewIcon className={classes.rightIcon}/>
        </Tooltip> : null}
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
