import { makeAutoObservable } from 'mobx';

export enum IsLoadingEnum {
  pending = 'pending',
  error = 'rejected',
  success = 'fulfilled',
}

class IsLoading {
  isLoading: IsLoadingEnum = IsLoadingEnum.pending;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(payload: IsLoadingEnum) {
    this.isLoading = payload;
  }
}

export default new IsLoading();
