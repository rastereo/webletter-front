import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdLogout } from 'react-icons/md';
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, IconButton, Stack, Text } from '@chakra-ui/react';

import DarkModeSwitcher from './DarkModeSwitcher/DarkModeSwitcher';
import { signOut } from '../api/signOut';
import type { RootState } from '@app/store';

import './Header.scss';

export function Header() {
  const { name } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <header className="header">
      <Stack
        direction="row"
        alignItems="center"
        justifySelf="start"
        className="ym-hide-content"
      >
        <Avatar name={name} size="sm">
          <AvatarBadge boxSize="1.25em" bg="green.400" />
        </Avatar>
        <Text fontWeight="bold">{name}</Text>
        <IconButton
          variant="outline"
          aria-label="Logout"
          icon={<MdLogout />}
          size="sm"
          onClick={() => signOut(navigate, dispatch)}
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
