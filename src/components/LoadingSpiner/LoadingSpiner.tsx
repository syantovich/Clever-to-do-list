import React from 'react';
import './LoadingSpiner.css';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '../../store/isLoading/selector';

interface IIsLoading {
  children: JSX.Element;
}
export default function LoadingSpinner({ children }: IIsLoading) {
  const isLoading = useSelector(isLoadingSelector);
  return isLoading ? (
    <div className="spinner-container">
      <div className="loading-spinner" />
    </div>
  ) : (
    children
  );
}
