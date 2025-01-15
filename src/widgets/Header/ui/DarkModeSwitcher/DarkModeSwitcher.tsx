import { useContext, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { UserContext } from '@shared/contexts';
import { toggleDarkMode } from '@widgets/Header/lib/toggleDarkMode';

function DarkModeSwitcher() {
  const { isDarkMode, setIsDarkMode } = useContext(UserContext);

  useEffect(() => {
    const isDark = localStorage.getItem('isDark');

    if (isDark !== null) {
      toggleDarkMode(JSON.parse(isDark), setIsDarkMode);
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
      onClick={() => toggleDarkMode(!isDarkMode, setIsDarkMode)}
      justifySelf="end"
    />
  );
}

export default DarkModeSwitcher;
