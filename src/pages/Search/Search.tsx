import { FormEvent, useContext, useEffect, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import WebletterList from '../../components/WebletterList/WebletterList';
import Counter from '../../components/Counter/Counter';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import './Search.css';

function Search() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    webletterList,
    setWebletterList,
    setExhibitionList,
    setLangList,
    weblettersCount,
    setWeblettersCount,
    isInitialLoadData,
    setIsInitialLoadData,
    mainApi,
  } = useContext(UserContext);

  useDocumentTitle('Webletters', true);

  async function getLastWebletters() {
    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      setIsInitialLoadData(true);

      const { webletterList, exhibitionList, langList, weblettersCount } =
        await mainApi.getInitialLoadData();

      setWebletterList(webletterList);
      setExhibitionList(exhibitionList.filter((exhibition) => exhibition));
      setLangList(langList.filter((lang) => lang));
      setWeblettersCount(weblettersCount);
    } catch (err) {
      setWeblettersCount(0);

      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  }

  async function searchWebletters(
    evt: FormEvent<HTMLFormElement>,
    selectedFilter: Record<string, string>
  ) {
    evt.preventDefault();

    setWebletterList(null);

    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      const data = await mainApi.searchWebletters(selectedFilter);

      if ('webletterList' in data) {
        setIsInitialLoadData(true);
        setWebletterList(data.webletterList);
        setWeblettersCount(data.weblettersCount);
      } else if (Array.isArray(data)) {
        setIsInitialLoadData(false);
        setWebletterList(data);
        setWeblettersCount(data.length);
      }
    } catch (err) {
      setWeblettersCount(0);

      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  }

  useEffect(() => {
    if (!webletterList) getLastWebletters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="search">
      <SearchForm onSubmit={searchWebletters} />
      <Counter
        quantity={weblettersCount}
        text={isInitialLoadData ? 'Всего писем:' : 'Найдено писем:'}
      />
      {webletterList ? (
        <>
          <WebletterList webletterList={webletterList} />
        </>
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <Loader />
      )}
    </main>
  );
}

export default Search;
