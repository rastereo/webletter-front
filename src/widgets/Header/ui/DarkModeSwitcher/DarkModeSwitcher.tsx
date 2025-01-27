import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { RootState } from '@app/store';
import { toggleDarkMode } from '@widgets/Header/lib/toggleDarkMode';
import { setDarkMode } from '@entities/user/model/userSlice';

function DarkModeSwitcher() {
  const { isDarkMode } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('isDark') === 'true';

    dispatch(setDarkMode(isDarkMode));

    if (isDarkMode !== null) {
      toggleDarkMode(isDarkMode, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconButton
      variant="outline"
      aria-label="Dark mode toggle"
      icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
      size="md"
      fontSize="20px"
      onClick={() => toggleDarkMode(!isDarkMode, dispatch)}
      justifySelf="end"
    />
  );
}

export default DarkModeSwitcher;
