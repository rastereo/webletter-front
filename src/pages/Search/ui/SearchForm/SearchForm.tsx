import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Input, Select, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

// import { UserContext } from '@shared/contexts';

import { ISearchForm } from '@types';
import { RootState } from '@app/store';
import { setSelectedFilter } from '@entities/searchConfig';

import './SearchForm.scss';

function SearchForm({ onSubmit }: ISearchForm) {
  const { exhibitionSelectList, langSelectList, rangeDate, selectedFilter } =
    useSelector((state: RootState) => state.searchConfig);

  const dispatch = useDispatch();

  function handleSelect(
    name: 'exhibition' | 'title' | 'lang' | 'startDate' | 'endDate',
    value: string
  ) {
    const updatedSelection = { ...selectedFilter };

    updatedSelection[name] = value;

    dispatch(setSelectedFilter(updatedSelection));
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
          onChange={(e) => handleSelect('exhibition', e.target.value)}
          value={selectedFilter.exhibition || ''}
        >
          <option></option>
          {exhibitionSelectList &&
            exhibitionSelectList.map((exhibition: string, index: number) => (
              <option key={index} value={exhibition}>
                {exhibition}
              </option>
            ))}
        </Select>
      </Stack>
      <Stack spacing={0} flex="3">
        <Text as="b" fontSize="xs" margin="0">
          Тема:
        </Text>
        <Input
          type="text"
          onChange={(e) => handleSelect('title', e.target.value)}
          value={selectedFilter.title || ''}
          min={5}
        />
      </Stack>
      <Stack spacing={0} flex="1">
        <Text as="label" fontSize="xs" margin="0" fontWeight="600">
          Язык:
        </Text>
        <Select
          onChange={(e) => handleSelect('lang', e.target.value)}
          value={selectedFilter.lang || ''}
        >
          <option></option>
          {langSelectList &&
            langSelectList.map((lang: string, index: number) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
        </Select>
      </Stack>
      <Stack spacing={0} flex="1">
        <Text as="label" fontSize="xs" margin="0" fontWeight="600">
          C:
        </Text>
        <Input
          type="date"
          onChange={(e) =>
            handleSelect('startDate', new Date(e.target.value).toISOString())
          }
          min={
            rangeDate.first_upload_date
              ? rangeDate.first_upload_date.split('T')[0]
              : new Date().toISOString()
          }
          max={
            rangeDate.last_upload_date
              ? rangeDate.last_upload_date.split('T')[0]
              : new Date().toISOString()
          }
        />
      </Stack>
      <Stack spacing={0} flex="1">
        <Text as="label" fontSize="xs" margin="0" fontWeight="600">
          По:
        </Text>
        <Input
          type="date"
          onChange={(e) =>
            handleSelect('endDate', new Date(e.target.value).toISOString())
          }
          min={
            rangeDate.first_upload_date
              ? rangeDate.first_upload_date.split('T')[0]
              : new Date().toISOString()
          }
          max={
            rangeDate.last_upload_date
              ? rangeDate.last_upload_date.split('T')[0]
              : new Date().toISOString()
          }
        />
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
