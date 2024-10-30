import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

interface DarkModeSwitcherProps {
  toggleDarkMode: (isDark: boolean) => void;
}

function DarkModeSwitcher({ toggleDarkMode }: DarkModeSwitcherProps) {
  return (
    <FormControl display="flex" alignItems="center" width="auto">
      <Switch pr={2} size="md" onChange={(evt) => toggleDarkMode(evt.target.checked)} />
      <FormLabel htmlFor="Dark mode switch" mb="0">
        Dark Mode
      </FormLabel>
    </FormControl>
  );
}

export default DarkModeSwitcher;
