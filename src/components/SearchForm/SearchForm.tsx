import { FormEvent, useContext } from 'react';
import { IconButton, Select, Stack, Text } from '@chakra-ui/react';
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons';

import UserContext from '../../contexts/UserContext';

import './SearchForm.css';

function SearchForm() {
  const {
    exhibitionList,
    setWebletterList,
    langList,
    selectedFilter,
    setSelectedFilter,
  } = useContext(UserContext);

  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

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

  

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setWebletterList(null);

    const params: string[] = [];

    for (let key in selectedFilter) {
      if (selectedFilter[key]) {
        params.push(`${key}=${encodeURIComponent(selectedFilter[key])}`);
      }
    }

    try {
      let res: Response;

      if (params.length > 0) {
        res = await fetch(`${baseUrl}/api/search?${params.join('&')}`, {
          credentials: 'include',
        });
      } else {
        res = await fetch(`${baseUrl}/api/webletters`, {
          credentials: 'include',
        });
      }

      if (res.ok) {
        const data = await res.json();
        setWebletterList(data.webletterList ? data.webletterList : data);
      } else {
        const error = await res.json();
        throw new Error(error.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // function resetSearchFilters(evt: FormEvent<HTMLFormElement>) {
  //   setSelectedFilter({});

  //   onSubmit(evt)
  // }

  return (
    <form className="search-form" onSubmit={(e) => onSubmit(e)}>
      <Stack spacing={0} flex="3">
        <Text as="b" fontSize="xs" margin="0">
          Выставка:
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
      <IconButton
        icon={<RepeatIcon />}
        aria-label="Reset search"
        colorScheme="teal"
        type="button"
        onClick={() => setSelectedFilter({})}
      />
    </form>
  );
}

export default SearchForm;
