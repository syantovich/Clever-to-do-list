import { makeAutoObservable } from 'mobx';

class WorkModeSelected {
  workMode: number = 0;

  selected: Date = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  setWorkMode(mode: number) {
    this.workMode = mode;
  }

  setSelected(date: Date) {
    this.selected = date;
  }
}
export default new WorkModeSelected();
