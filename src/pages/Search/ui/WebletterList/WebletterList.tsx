import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, Box, Fade, Text } from '@chakra-ui/react';
import ReactCountryFlag from 'react-country-flag';
import { MdOutlineImageNotSupported } from 'react-icons/md';

import ViewSwitcher from './ViewSwitcher/ViewSwitcher';
import { RootState } from '@app/store';

import { IWebletter } from '@types';

import './WebletterList.scss';

interface WebletterTableProps {
  webletterList: IWebletter[];
}

function WebletterList({ webletterList }: WebletterTableProps) {
  const { viewMode } = useSelector((state: RootState) => state.webletterList);

  function createLocalDateString(uploadDate: string): string {
    const newDate = new Date(uploadDate);

    const time = newDate.toLocaleDateString().slice(0, -3);
    const date = newDate.toLocaleDateString();

    return `${time} ${date}`;
  }

  return (
    <Fade in={webletterList ? true : false} className="webletter-list">
      <section className="webletter-list">
        <ViewSwitcher />
        <ul className="webletter-list__list">
          <li
            className={`webletter-list__titles ${
              viewMode === 'card' && 'hide'
            }`}
          >
            <p>Банер</p>
            <p>Имя</p>
            <p>Тема</p>
            <p>Язык</p>
            <p className="grid-center">Размер</p>
            <p className="grid-center">Дата</p>
          </li>
        </ul>
        <ul
          className={`webletter-list__list ${
            viewMode === 'card' && 'webletter-list__list_position_card'
          }`}
        >
          {webletterList.map(
            ({ id, banner, exhibition, title, size, upload_date, lang }) => (
              <Box
                as="li"
                boxShadow={`${viewMode === 'card' && 'sm'}`}
                key={id}
                _hover={{ boxShadow: `${viewMode === 'card' && 'xl'}` }}
                className={`webletter-list__item ${
                  viewMode === 'card' && 'webletter-list__item_position_card'
                }`}
              >
                <Link
                  to={`/${id}`}
                  className={`webletter-list__link ${
                    viewMode === 'card' && 'webletter-list__link_position_card'
                  }`}
                >
                  {banner ? (
                    <img
                      src={`${
                        import.meta.env.VITE_APP_WEBLETTER_URL
                      }/${id}/${banner}`}
                      alt={exhibition ? exhibition : 'Banner'}
                      className={`webletter-list__banner ${
                        viewMode === 'card' &&
                        'webletter-list__banner_position_card'
                      }`}
                    />
                  ) : (
                    <MdOutlineImageNotSupported
                      className={`webletter-list__banner ${
                        viewMode === 'card' &&
                        'webletter-list__banner_position_card'
                      }`}
                    />
                  )}
                  <Text
                    className={`webletter-list__name ${
                      viewMode === 'card' &&
                      'webletter-list__name_position_card'
                    }`}
                  >
                    {exhibition}
                  </Text>
                  <Text>{title}</Text>
                  {viewMode === 'card' ? (
                    <div className="webletter-list__container">
                      <Badge
                        colorScheme={size > 1e6 ? 'red' : 'green'}
                        className="grid-center"
                        maxWidth="50px"
                      >
                        {(size / 1e6).toFixed(2)}MB
                      </Badge>
                      <ReactCountryFlag
                        countryCode={lang === 'en' ? 'GB' : lang}
                        style={{ width: '2em', height: '2em' }}
                        svg
                        className="webletter-list__flag grid-center"
                      />
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                  <Text
                    fontSize={`${viewMode === 'card' && 'xs'}`}
                    className={`webletter-list__date ${
                      viewMode === 'card' &&
                      'webletter-list__date_position_card'
                    }`}
                  >
                    {createLocalDateString(upload_date)}
                  </Text>
                </Link>
              </Box>
            )
          )}
        </ul>
      </section>
    </Fade>
  );
}

export default WebletterList;
