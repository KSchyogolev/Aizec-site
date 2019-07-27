import React, { useState } from 'react'
import { ParentInput } from '../'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
  addButton: {
    marginTop: 30
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}))

const ParentInfoForm = props => {
  const {user} = props
  const initialParents = user.parents
  const [parentsCount, setParentCount] = useState(initialParents.length)
  const classes = useStyles()


  const handleAddParent = () => {
    setParentCount(parentsCount + 1)
    props.handleChange({
      target: {
        name: 'parents',
        value: [...user.parents, {}]
      }
    })
  }

  const drawParents = () => {
    let parents = []
    for (let i = 0; i < parentsCount; i++) {
      parents.push(<ParentInput parent={user.parents[i]} handleChange={handleChange} key={i}
                                number={i}/>);
    }
    return parents;
  }

  const handleChange = (e, index) => {
    const {target: {name, value}} = e
    const parents = [...user.parents]
    parents[index][name] = value
    props.handleChange({
      target: {
        name: 'parents',
        value: parents
      }
    })
  }

  return (
    <div className={classes.root}>
      {drawParents()}
      {parentsCount < 2 ? <Button className={classes.addButton} variant="contained" onClick={handleAddParent}>
        Добавить родителя
      </Button> : ''}
    </div>
  )
}

export default ParentInfoForm