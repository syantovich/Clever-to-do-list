import { makeAutoObservable } from 'mobx';

class SwitchGraphs {
  isGraphs: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setGraphs(bool: boolean) {
    this.isGraphs = bool;
  }
}
export default new SwitchGraphs();
