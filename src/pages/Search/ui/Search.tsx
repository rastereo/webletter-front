import { FormEvent, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WebletterList from './WebletterList/WebletterList';
import SearchForm from './SearchForm/SearchForm';
import { Counter } from './Counter/Counter';
import { getLastWebletters } from '../api/getLastWebletters';
import { searchWebletters } from '../api/searchWebletters';

import { RootState } from '@app/store';
import { ErrorMessage } from '@widgets/ErrorMessage';
import { Loader } from '@widgets/Loader';
import { setList } from '@entities/webletterList';
import { UserContext } from '@shared/contexts';
import useDocumentTitle from '@shared/lib/useDocumentTitle';

import './Search.scss';
import { ISelectedFilter } from '@/types';

export function Search() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { list, count, totalCount } = useSelector(
    (state: RootState) => state.webletterList
  );

  const dispatch = useDispatch();

  const { isInitialLoadData, setIsInitialLoadData, mainApi } =
    useContext(UserContext);

  useDocumentTitle('Webletters', true);

  function handleSubmit(
    evt: FormEvent<HTMLFormElement>,
    selectedFilter: ISelectedFilter
  ) {
    evt.preventDefault();

    dispatch(setList([]));

    if (Object.values(selectedFilter).every((value) => value === '')) {
      getLastWebletters(
        mainApi,
        setIsInitialLoadData,
        setErrorMessage,
        dispatch
      );
    } else {
      searchWebletters(
        mainApi,
        selectedFilter,
        setErrorMessage,
        setIsInitialLoadData,
        dispatch
      );
    }
  }

  useEffect(() => {
    if (count === 0) {
      getLastWebletters(
        mainApi,
        setIsInitialLoadData,
        setErrorMessage,
        dispatch
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="search">
      <SearchForm onSubmit={handleSubmit} />
      <Counter
        quantity={isInitialLoadData ? totalCount : count}
        text={isInitialLoadData ? 'Всего писем:' : 'Найдено писем:'}
      />
      {count ? (
        <>
          <WebletterList webletterList={list} />
        </>
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <Loader />
      )}
    </main>
  );
}
