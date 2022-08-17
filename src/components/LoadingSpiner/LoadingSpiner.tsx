import React from 'react';
import './LoadingSpiner.css';
import isLoading, { IsLoadingEnum } from '../../store/isLoading/isLoading';
import { observer } from 'mobx-react-lite';

interface IIsLoading {
  children: JSX.Element;
}
const LoadingSpinner = observer(({ children }: IIsLoading) => {
  return isLoading.isLoading === IsLoadingEnum.pending ? (
    <div className="spinner-container">
      <div className="loading-spinner" />
    </div>
  ) : (
    children
  );
});
export default LoadingSpinner;
