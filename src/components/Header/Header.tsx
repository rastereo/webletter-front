import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarBadge, IconButton, Stack, Text } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { RepeatIcon } from '@chakra-ui/icons';

import DarkModeSwitcher from '../DarkModeSwitcher/DarkModeSwitcher';
import UserContext from '../../contexts/UserContext';

import './Header.css';

function Header() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();

  async function logOut() {
    try {
      const res = await fetch('https://wl.gefera.ru/auth/logout', {
        credentials: 'include',
      });

      if (res.ok) {
        navigate('/login', { replace: true });
      } else {
        const { message } = await res.json();

        throw new Error(message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className="header">
      <Stack direction="row" alignItems="center">
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
      <IconButton
        variant="outline"
        aria-label="Home page"
        fontSize={location.pathname === '/' ? '20px' : '23px'}
        icon={location.pathname === '/' ? <RepeatIcon /> : <IoHomeOutline />}
        onClick={() =>
          location.pathname === '/' ? window.location.reload() : navigate('/')
        }
      />
      <DarkModeSwitcher />
    </header>
  );
}

export default Header;
