import { action, observable } from 'mobx'

class Store {
  @observable fileList = {}
  @observable currentState = {}
  @observable currentDictionary = {nodes: []}
  @observable currentScenario = {}
}

export default new Store()
