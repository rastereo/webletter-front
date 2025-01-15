import {
  enable as enableDarkReader,
  disable as disableDarkReader,
} from 'darkreader';

export function toggleDarkMode(
  isDarkMode: boolean,
  setIsDarkMode: (value: boolean) => void
) {
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
