import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { inject, observer } from 'mobx-react'
import store from '../../store'

const styles = theme => ({
  root: {
    margin: '15px'
  }
})

@inject('store')
@observer
class ProfilePage extends Component {

  render () {
    const {classes, store} = this.props
    return (
      <div className={classes.root}>
        <Button variant="contained" onClick={() => store.getUsers()}>
          GET USERS
        </Button>
      </div>
    )
  }
}


export default withStyles(styles)(ProfilePage)
