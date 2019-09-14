import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BuyDialog } from '../dialogs'
import Card from '@material-ui/core/Card'
import clsx from 'clsx';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

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
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}))

const translate = {
  regular: 'Регулярный курс',
  offer: 'Предложение',
  intensive: 'Интенсивный курс',
  merch: 'Мерчендайз',
}

const MessageWidget = ({kind, head_text, full_text, index, handleClickBuy = () => {}, merch_id, course_id, message_id, img, cost, ...props}) => {
  const classes = useStyles()
  const [open, setDialogOpen] = useState(false)

  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const handleClose = () => setDialogOpen(false)
  const handleOpen = () => setDialogOpen(true)

  return (
      <Card className={classes.card} key={index}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            className={classes.media}
            image={img}
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
          <IconButton onClick={handleOpen}>
            <AddShoppingCartIcon/>
          </IconButton>
          {cost ? <span className={classes.cost}>{cost},00 руб.</span> : null}
{/*          <IconButton className={classes.rightAction}>
            <FavoriteIcon/>
          </IconButton>*/}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {full_text}
            </Typography>
          </CardContent>
        </Collapse>
        <BuyDialog handleClose={handleClose} open={open} name={head_text} merch_id={merch_id} course_id={course_id}
                   cost={cost}
                   message_id={message_id}/>
      </Card>
  )

}

export default (MessageWidget)
