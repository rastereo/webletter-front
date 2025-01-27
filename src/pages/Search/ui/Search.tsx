import { FormEvent, useEffect, useState } from 'react';
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
import useDocumentTitle from '@shared/lib/useDocumentTitle';

import { ISelectedFilter } from '@types';

import './Search.scss';

export function Search() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { list, count, totalCount, isInitialLoadData } = useSelector(
    (state: RootState) => state.webletterList
  );

  const dispatch = useDispatch();

  useDocumentTitle('Webletters', true);

  function handleSubmit(
    evt: FormEvent<HTMLFormElement>,
    selectedFilter: ISelectedFilter
  ) {
    evt.preventDefault();

    dispatch(setList([]));

    if (Object.values(selectedFilter).every((value) => value === '')) {
      getLastWebletters(setErrorMessage, dispatch);
    } else {
      searchWebletters(selectedFilter, setErrorMessage, dispatch);
    }
  }

  useEffect(() => {
    if (count === 0) {
      getLastWebletters(setErrorMessage, dispatch);
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
