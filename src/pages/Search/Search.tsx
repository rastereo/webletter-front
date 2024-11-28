import { FormEvent, useContext, useEffect, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import WebletterTable from '../../components/WebletterTable/WebletterTable';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import './Search.css';

function Search() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    webletterList,
    setWebletterList,
    setExhibitionList,
    setLangList,
    mainApi,
  } = useContext(UserContext);

  useDocumentTitle('Webletters', true);

  async function getLastWebletters() {
    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      const result = await mainApi.getInitialLoadData();

      if (!(result instanceof Error)) {
        const { webletterList, exhibitionList, langList } = result;

        setWebletterList(webletterList);
        setExhibitionList(exhibitionList.filter((exhibition) => exhibition));
        setLangList(langList.filter((lang) => lang));
      }
    } catch (err) {
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
        setWebletterList(data.webletterList);
      } else if (Array.isArray(data)) {
        setWebletterList(data);
      }
    } catch (err) {
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
    <section className="search">
      <SearchForm onSubmit={searchWebletters} />
      {webletterList ? (
        <WebletterTable webletterList={webletterList} />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Search;
