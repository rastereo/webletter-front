// import { FormControl, IconButton } from '@chakra-ui/react';
// import { FaMobileAlt, FaDesktop } from 'react-icons/fa';
// import { FiFileText } from 'react-icons/fi';

// import ShareButton from '../ShareButton/ShareButton';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarBadge, IconButton, Stack, Text } from '@chakra-ui/react';
import { IoHomeOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

import DarkModeSwitcher from '../DarkModeSwitcher/DarkModeSwitcher';
import UserContext from '../../contexts/UserContext';

import './Header.css';

// interface HeaderProps {
//   navigate: NavigateFunction
// }

function Header() {
  const [username, setUsername] = useState<string>('');
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // const jwtCookieName = import.meta.env.VITE_APP_JWT_COOKIE_NAME

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

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

  useEffect(() => {
    userContext.user && setUsername(userContext.user);
  }, [userContext]);

  return (
    <header className="header">
      <Stack direction="row" alignItems="center">
        <Avatar name={username} size="sm">
          <AvatarBadge boxSize="1.25em" bg="green.400" />
        </Avatar>
        <Text fontWeight="bold">{username}</Text>
        <IconButton
          variant="outline"
          aria-label="Home page"
          icon={<MdLogout />}
          size="sm"
          onClick={() => logOut()}
        />
      </Stack>
      <IconButton
        variant="outline"
        aria-label="Home page"
        fontSize="30px"
        icon={<IoHomeOutline />}
        onClick={() => navigate('/')}
      />
      <DarkModeSwitcher />
    </header>
  );
}

export default Header;
