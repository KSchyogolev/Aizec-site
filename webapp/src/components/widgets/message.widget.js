import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: 'left'
  },
  media: {
    height: 140
  }
}))

const widgetImg = {
  offer: 'offer_card.jpg',
  product: 'product_card.jpg',
  course: 'course_card.jpg'
}

const MessageWidget = ({kind, head_text, full_text}) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={widgetImg[kind] && require('../../static/images/' + widgetImg[kind])}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {head_text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {full_text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton>
          <FavoriteIcon/>
        </IconButton>
        <IconButton>
          <AddShoppingCartIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )

}

export default (MessageWidget)
