import { action, observable } from 'mobx'
import {RouterStore} from 'mobx-router';


class Store {
  @observable fileList = {}
  @observable currentState = {}
  @observable currentDictionary = {nodes: []}
  @observable currentScenario = {}
  @observable router = new RouterStore()
}

export default new Store()
