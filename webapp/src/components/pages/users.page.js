import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import store from '../../store'
import MaterialTable from "material-table"
import { forwardRef } from 'react'
import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
}

const styles = theme => ({
  root: {
    maxWidth: '100%',
    margin: '15px'
  }
})

@inject('store')
@observer
class UsersPage extends Component {

  componentDidMount () {
    this.props.store.getUsers()
  }

  render () {
    const {classes, store} = this.props
    return (
      <div className={classes.root}>
        <MaterialTable
          title="Пользователи"
          icons={tableIcons}
          columns={[
            {title: "Имя", field: "first_name"},
            {title: "Фамилия", field: "second_name"},
            {title: "Пароль", field: "password"},
            {title: "Почта", field: "email"},
            {title: "Телефон", field: "phone"},
            {title: "Информация", field: "bio"},
            {
              title: "Роль",
              field: "role",
              lookup: {'admin': "Администратор", 'teacher': "Учитель", 'student': 'Ученик'}
            }
          ]}
          data={store.users}
          options={{
            pageSize: 10,
            pageSizeOptions: [5, 10, 20]
          }}
          editable={{
            onRowAdd: newData => new Promise((resolve, reject) => store.addUser(newData).then(resolve).catch(reject)),
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => store.updateUser(oldData.id, newData).then(() => {
              this.forceUpdate()
              console.log(store.users)
              resolve()
            }).catch(reject)),
            onRowDelete: oldData => new Promise((resolve, reject) => store.deleteUser(oldData.id).then(() => {
              this.forceUpdate()
              resolve()
            }).catch(reject))
          }}
        />
      </div>
    )
  }
}


export default withStyles(styles)(UsersPage)
