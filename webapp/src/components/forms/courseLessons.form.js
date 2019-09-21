import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Paper } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))

const CourseLessonsForm = ({store, courseId}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Тип</TableCell>
              <TableCell align="left">Заголовок</TableCell>
              <TableCell align="left">Текст</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.messages && store.messages.filter(item => item.kind === 'offer').map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">row</TableCell>
                <TableCell align="left">{row.head_text}</TableCell>
                <TableCell align="left">{row.full_text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default inject('store')(observer(CourseLessonsForm))
