import { Link } from 'react-router-dom';
import { Badge, Fade, Text } from '@chakra-ui/react';
import ReactCountryFlag from 'react-country-flag';
import { MdOutlineImageNotSupported } from 'react-icons/md';

import { ResultWebletter } from '../../../../types';

import './WebletterList.css';

interface WebletterTableProps {
  webletterList: ResultWebletter[];
}

// useEffect(() => {
//   animate([['ul', { opacity: 1 }], ['li', { delay: stagger(.2) }]]);
// }, [])

function WebletterTable({ webletterList }: WebletterTableProps) {
  return (
    <Fade in={webletterList ? true : false} className="webletter-list">
      <section className="webletter-list">
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
        <ul className="webletter-list__list">
          {webletterList &&
            webletterList.map(
              ({ id, banner, exhibition, title, size, upload_date, lang }) => (
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
      </section>
    </Fade>
  );
}

export default WebletterTable;
