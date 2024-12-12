import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, AvatarBadge, IconButton, Stack, Text } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons';

import DarkModeSwitcher from '../DarkModeSwitcher/DarkModeSwitcher';
import UserContext from '../../app/contexts/UserContext';

import './Header.css';

function Header() {
  const { user, mainApi } = useContext(UserContext);

  const navigate = useNavigate();

  async function logOut() {
    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      const { message } = await mainApi.signOut();

      if (message) {
        navigate('login', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async function logOut() {
  //   try {
  //     const res = await fetch('https://wl.gefera.ru/auth/logout', {
  //       credentials: 'include',
  //     });

  //     if (res.ok) {
  //       navigate('/login', { replace: true });
  //     } else {
  //       const { message } = await res.json();

  //       throw new Error(message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <header className="header">
      <Stack direction="row" alignItems="center" justifySelf="start">
        <Avatar name={user || ''} size="sm">
          <AvatarBadge boxSize="1.25em" bg="green.400" />
        </Avatar>
        <Text fontWeight="bold">{user}</Text>
        <IconButton
          variant="outline"
          aria-label="Logout"
          icon={<MdLogout />}
          size="sm"
          onClick={() => logOut()}
        />
      </Stack>
      <nav>
        <NavLink to="/" reloadDocument={location.pathname === '/'}>
          <IconButton
            as="div"
            variant="outline"
            aria-label="Search page"
            fontSize="20px"
            icon={location.pathname === '/' ? <RepeatIcon /> : <SearchIcon />}
          />
        </NavLink>
      </nav>
      <DarkModeSwitcher />
    </header>
  );
}

export default Header;
