import { useContext, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  enable as enableDarkReader,
  disable as disableDarkReader,
} from 'darkreader';
import UserContext from '../../app/contexts/UserContext';

// interface DarkModeSwitcherProps {
//   toggleDarkMode?: (isDark: boolean) => void;
// }

function DarkModeSwitcher() {
  const { isDarkMode, setIsDarkMode } = useContext(UserContext);

  function toggleDarkMode(isDarkMode: boolean) {
    const darkModeTheme = {
      brightness: 90, // Slightly reduced brightness for a dimmer look
      contrast: 100, // Standard contrast; you can adjust higher based on needs
      sepia: 0, // No sepia to maintain a cooler, more neutral tone
      grayscale: 0, // Do not apply grayscale unless specifically desired
    };

    if (isDarkMode) {
      enableDarkReader(darkModeTheme);
    } else {
      disableDarkReader();
    }

    setIsDarkMode(isDarkMode);

    localStorage.setItem('isDark', `${isDarkMode}`);
  }

  useEffect(() => {
    const isDark = localStorage.getItem('isDark');

    if (isDark !== null) {
      toggleDarkMode(JSON.parse(isDark));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconButton
      variant="outline"
      aria-label="Home page"
      icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
      size="md"
      fontSize="20px"
      onClick={() => toggleDarkMode(!isDarkMode)}
      justifySelf="end"
    />
  );
}

export default DarkModeSwitcher;
