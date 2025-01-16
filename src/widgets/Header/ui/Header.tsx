import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, AvatarBadge, IconButton, Stack, Text } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons';

import DarkModeSwitcher from './DarkModeSwitcher/DarkModeSwitcher';
import { signOut } from '../api/signOut';
import { UserContext } from '@shared/contexts';

import './Header.scss';

export function Header() {
  const { user, mainApi } = useContext(UserContext);

  const navigate = useNavigate();

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
          onClick={() => signOut(mainApi, navigate)}
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
