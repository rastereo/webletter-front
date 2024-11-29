import { useContext } from 'react';
import { IconButton, Select, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import UserContext from '../../contexts/UserContext';
import { ISearchForm } from '../../types';

import './SearchForm.css';

function SearchForm({ onSubmit }: ISearchForm) {
  const {
    exhibitionList,
    langList,
    selectedFilter,
    setSelectedFilter,
  } = useContext(UserContext);

  function handleSelect(name: string, value: string) {
    setSelectedFilter((prevSelection: Record<string, string>) => {
      const updatedSelection = { ...prevSelection };
      if (value === 'Все') {
        delete updatedSelection[name];
      } else {
        updatedSelection[name] = value;
      }
      return updatedSelection;
    });
  }

  return (
    <form
      className="search-form"
      onSubmit={(evt) => onSubmit(evt, selectedFilter)}
    >
      <Stack spacing={0} flex="3">
        <Text as="b" fontSize="xs" margin="0">
          Имя:
        </Text>
        <Select
          placeholder="Все"
          onChange={(e) => handleSelect('exhibition', e.target.value)}
          value={selectedFilter.exhibition || ''}
        >
          {exhibitionList &&
            exhibitionList.map((exhibition: string, index: number) => (
              <option key={index} value={exhibition}>
                {exhibition}
              </option>
            ))}
        </Select>
      </Stack>
      <Stack spacing={0} flex="1">
        <Text as="b" fontSize="xs" margin="0">
          Язык:
        </Text>
        <Select
          placeholder="Все"
          onChange={(e) => handleSelect('lang', e.target.value)}
          value={selectedFilter.lang || ''}
        >
          {langList &&
            langList.map((lang: string, index: number) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
        </Select>
      </Stack>
      <IconButton
        icon={<SearchIcon />}
        aria-label="Search webletter"
        colorScheme="blue"
        type="submit"
      />
      {/* <IconButton
        icon={<RepeatIcon />}
        aria-label="Reset search"
        colorScheme="teal"
        type="button"
        onClick={() => setSelectedFilter({})}
      /> */}
    </form>
  );
}

export default SearchForm;
