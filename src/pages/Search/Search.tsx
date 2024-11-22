import { useContext, useEffect } from 'react';
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

import './Search.css';
import ReactCountryFlag from 'react-country-flag';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import Loader from '../../components/Loader/Loader';

function Search() {
  const { webletterList, setWebletterList } = useContext(UserContext);

  const url = import.meta.env.VITE_APP_SERVER_URL;
  const token = import.meta.env.VITE_APP_API_TOKEN;

  const navigate = useNavigate();

  async function getLastWebletters() {
    try {
      const res = await fetch(`${url}/api/webletters`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `${token}`,
        },
      });

      if (res.ok) {
        const { webletterList } = await res.json();

        setWebletterList(webletterList.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!webletterList) getLastWebletters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return webletterList ? (
    <section className="search">
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
                        src={`${url}/webletter/${id}/${banner}`}
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
                      {/* <p>{lang}</p> */}
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
    </section>
  ) : (
    <Loader />
  );
}

export default Search;
