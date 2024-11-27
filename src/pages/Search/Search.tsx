import { FormEvent, useContext, useEffect, useState } from 'react';
import {
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import ReactCountryFlag from 'react-country-flag';

import './Search.css';

import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Search() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { webletterList, setWebletterList, setExhibitionList, setLangList, mainApi } =
    useContext(UserContext);

  const navigate = useNavigate();

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
        <TableContainer width="100%" whiteSpace="wrap">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Баннер</Th>
                <Th>
                  <p>Выставка</p>
                </Th>
                <Th>
                  <p>Тема письма</p>
                </Th>
                <Th>
                  <p>Язык</p>
                </Th>
                <Th>
                  <p>Размер</p>
                </Th>
                <Th>
                  <p>Дата</p>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {webletterList &&
                webletterList.map(
                  ({
                    id,
                    banner,
                    exhibition,
                    title,
                    size,
                    upload_date,
                    lang,
                  }) => (
                    <Tr
                      key={id}
                      onClick={() => navigate(`/${id}`)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'background 0.4s linear',
                        '&:hover': {
                          backgroundColor: 'var(--gray)',
                          fontWeight: '600',
                        },
                      }}
                    >
                      <Td style={{ padding: 0 }}>
                        <img
                          src={`${
                            import.meta.env.VITE_APP_WEBLETTER_URL
                          }/${id}/${banner}`}
                          alt={exhibition ? exhibition : 'Banner'}
                          style={{
                            maxWidth: '100px',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Td>
                      <Td>
                        <p>{exhibition}</p>
                      </Td>
                      <Td>
                        <p>{title}</p>
                      </Td>
                      <Td>
                        <ReactCountryFlag
                          countryCode={lang === 'en' ? 'GB' : lang}
                          style={{ width: '2em', height: '2em' }}
                          svg
                        />
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={size > 1e6 ? 'red' : 'green'}
                          className="no-darkreader"
                        >
                          {(size / 1e6).toFixed(2)}MB
                        </Badge>
                      </Td>
                      <Td style={{ padding: 0 }}>
                        <p>
                          {`${new Date(upload_date)
                            .toLocaleTimeString()
                            .slice(0, -3)}`}{' '}
                          {`${new Date(upload_date).toLocaleDateString()}`}
                        </p>
                      </Td>
                    </Tr>
                  )
                )}
            </Tbody>
          </Table>
        </TableContainer>
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Search;
