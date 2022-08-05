import { IStore } from '../IStore';

export const isLoadingSelector = (state: IStore) => state.isLoading.is;
