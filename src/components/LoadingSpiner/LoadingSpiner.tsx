import React from 'react';
import './LoadingSpiner.css';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '../../store/isLoading/selector';
import { IsLoadingEnum } from '../../store/isLoading/isLoadingSlice';

interface IIsLoading {
  children: JSX.Element;
}
export default function LoadingSpinner({ children }: IIsLoading) {
  const isLoading = useSelector(isLoadingSelector);
  return isLoading === IsLoadingEnum.pending ? (
    <div className="spinner-container">
      <div className="loading-spinner" />
    </div>
  ) : (
    children
  );
}
