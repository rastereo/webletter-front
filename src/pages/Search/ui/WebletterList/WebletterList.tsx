import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, Box, Fade, Text } from '@chakra-ui/react';
import ReactCountryFlag from 'react-country-flag';
import { MdOutlineImageNotSupported } from 'react-icons/md';

import ViewSwitcher from './ViewSwitcher/ViewSwitcher';

import { IWebletter } from '@types';

import './WebletterList.scss';
import { RootState } from '@/app/store';

interface WebletterTableProps {
  webletterList: IWebletter[];
}

function WebletterList({ webletterList }: WebletterTableProps) {
  const { viewMode } = useSelector((state: RootState) => state.webletterList);

  return (
    <Fade in={webletterList ? true : false} className="webletter-list">
      <section className="webletter-list">
        <ViewSwitcher />
        {viewMode !== 'card' ? (
          <>
            <ul>
              <li className="webletter-list__row webletter-list__row_position_title">
                <p>Банер</p>
                <p>Имя</p>
                <p>Тема</p>
                <p>Язык</p>
                <p className="grid-center">Размер</p>
                <p className="grid-center">Дата</p>
              </li>
            </ul>
            <ul>
              {webletterList.map(
                ({
                  id,
                  banner,
                  exhibition,
                  title,
                  size,
                  upload_date,
                  lang,
                }) => (
                  <li key={id} className="webletter-list__item">
                    <Link to={`/${id}`} className="webletter-list__row">
                      {banner ? (
                        <img
                          src={`${
                            import.meta.env.VITE_APP_WEBLETTER_URL
                          }/${id}/${banner}`}
                          alt={exhibition ? exhibition : 'Banner'}
                          className="webletter-list__banner"
                        />
                      ) : (
                        <MdOutlineImageNotSupported className="webletter-list__banner" />
                      )}
                      <Text>{exhibition}</Text>
                      <Text>{title}</Text>
                      <ReactCountryFlag
                        countryCode={lang === 'en' ? 'GB' : lang}
                        style={{ width: '2em', height: '2em' }}
                        svg
                        className="grid-center"
                      />
                      <Badge
                        colorScheme={size > 1e6 ? 'red' : 'green'}
                        className="grid-center"
                        maxWidth="50px"
                      >
                        {(size / 1e6).toFixed(2)}MB
                      </Badge>
                      <Text sx={{ justifySelf: 'center' }}>
                        {`${new Date(upload_date)
                          .toLocaleTimeString()
                          .slice(0, -3)}`}{' '}
                        {`${new Date(upload_date).toLocaleDateString()}`}
                      </Text>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </>
        ) : (
          <ul className="webletter-list__list">
            {webletterList.map(
              ({ id, banner, exhibition, title, size, upload_date, lang }) => (
                <Box
                  as="li"
                  boxShadow="sm"
                  key={id}
                  className="webletter-list__card"
                  transition="all 0.2s ease-in-out"
                  _hover={{
                    boxShadow: 'xl',
                    transform: 'scale(1.05)',
                  }}
                >
                  <Link to={`/${id}`} className="webletter-list__link">
                    {banner ? (
                      <img
                        src={`${
                          import.meta.env.VITE_APP_WEBLETTER_URL
                        }/${id}/${banner}`}
                        alt={exhibition ? exhibition : 'Banner'}
                        className="webletter-list__banner webletter-list__banner_position_card"
                      />
                    ) : (
                      <MdOutlineImageNotSupported className="webletter-list__banner webletter-list__banner_position_card" />
                    )}
                    <div className="webletter-list__container">
                      <Badge
                        colorScheme={size > 1e6 ? 'red' : 'green'}
                        maxWidth="50px"
                      >
                        {(size / 1e6).toFixed(2)}MB
                      </Badge>
                      <ReactCountryFlag
                        countryCode={lang === 'en' ? 'GB' : lang}
                        style={{
                          width: '2em',
                          height: '2em',
                        }}
                        svg
                      />
                    </div>
                    <div>
                      <Text fontWeight={600}>{exhibition}</Text>
                      <Text>{title}</Text>
                    </div>
                    <Text fontSize="0.8rem" className="webletter-list__date">
                      {`${new Date(upload_date)
                        .toLocaleTimeString()
                        .slice(0, -3)}`}{' '}
                      {`${new Date(upload_date).toLocaleDateString()}`}
                    </Text>
                  </Link>
                </Box>
              )
            )}
          </ul>
        )}
      </section>
    </Fade>
  );
}

export default WebletterList;
