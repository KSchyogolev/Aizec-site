import React, { useState } from 'react'
import { ParentInput } from '../'
import Button from '@material-ui/core/Button'

const ParentInfoForm = props => {
  // const [parents, addParent] = useState([{}])
  return (
    <div>
      <ParentInput {...props}/>
      {/*      {parents.map((parent, index) => <ParentInput {...props} key={index} number={index}/>)}
      {parents.length < 2 ? <Button variant="contained" onClick={() => {
        addParent([...parents, {}])
      }}>
        Добавить родителя
      </Button> : ''}*/}
    </div>
  )
}

export default ParentInfoForm