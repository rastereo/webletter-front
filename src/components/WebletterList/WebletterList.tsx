import {
  Badge,
  Text,
} from '@chakra-ui/react';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';

import { ResultWebletter } from '../../types';

import './WebletterList.css';

interface WebletterTableProps {
  webletterList: ResultWebletter[];
}

function WebletterTable({ webletterList }: WebletterTableProps) {
  return (
    <section className="webletter-table">
      <ul className="webletter-table__list">
        <li className="webletter-table__row webletter-table__row_position_title">
          <p>Банер</p>
          <p>Имя</p>
          <p>Темя</p>
          <p className="grid-center">Язык</p>
          <p className="grid-center">Размер</p>
          <p className="grid-center">Дата</p>
        </li>
        {webletterList &&
          webletterList.map(
            ({ id, banner, exhibition, title, size, upload_date, lang }) => (
              <li key={id} className="webletter-table__item">
                <Link to={`/${id}`} className="webletter-table__row">
                  <img
                    src={`${
                      import.meta.env.VITE_APP_WEBLETTER_URL
                    }/${id}/${banner}`}
                    alt={exhibition ? exhibition : 'Banner'}
                    className="webletter-table__banner"
                  />
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
  );
}

export default WebletterTable;
