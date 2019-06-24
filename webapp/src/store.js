import { action, observable } from 'mobx'
import { RouterStore } from 'mobx-router'
import API from './api/api'

class Store {

  @observable router = new RouterStore()

  @action
  getUsers () {
    API.main.getUsers().then(res => console.log(res))
  }
}

export default new Store()
