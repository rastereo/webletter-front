import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Input, Select, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { ISearchForm } from '@types';
import { RootState } from '@app/store';
import { setSelectedFilter } from '@entities/searchConfig';

import './SearchForm.scss';

function SearchForm({ onSubmit }: ISearchForm) {
  // const [];
  const { exhibitionSelectList, langSelectList, rangeDate, selectedFilter } =
    useSelector((state: RootState) => state.searchConfig);

  const dispatch = useDispatch();

  function handleSelect(
    name: 'exhibition' | 'title' | 'lang' | 'startDate' | 'endDate',
    value: string
  ) {
    const updatedSelection = { ...selectedFilter };

    if (name === 'startDate' || name === 'endDate') {
      const dateValue = value ? new Date(value).toISOString() : value;

      updatedSelection[name] = dateValue;
    } else {
      updatedSelection[name] = value;
    }

    dispatch(setSelectedFilter(updatedSelection));
  }

  function getMaxStartDate(): string {
    let maxStartDate = new Date().toISOString();

    if (selectedFilter.endDate) {
      maxStartDate = selectedFilter.endDate;
    } else if (rangeDate.last_upload_date) {
      maxStartDate = rangeDate.last_upload_date;
    }

    return maxStartDate.split('T')[0];
  }

  function getMinEndDate() {
    let minEndDate = new Date().toISOString();

    if (selectedFilter.startDate) {
      minEndDate = selectedFilter.startDate;
    } else if (rangeDate.first_upload_date) {
      minEndDate = rangeDate.first_upload_date;
    }

    return minEndDate.split('T')[0];
  }

  return (
    <form
      className="search-form"
      onSubmit={(evt) => onSubmit(evt, selectedFilter)}
    >
      <Stack spacing={0} flex="3" width="100%">
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
      <Stack spacing={0} flex="3" width="100%">
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
      <Stack spacing={0} flex="1" width="100%">
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
      <Stack spacing={0} flex="1" width="100%">
        <Text as="label" fontSize="xs" margin="0" fontWeight="600">
          C:
        </Text>
        <Input
          type="date"
          value={selectedFilter.startDate.split('T')[0]}
          onChange={(e) => handleSelect('startDate', e.target.value)}
          min={
            rangeDate.first_upload_date
              ? rangeDate.first_upload_date.split('T')[0]
              : new Date().toISOString()
          }
          max={getMaxStartDate()}
        />
      </Stack>
      <Stack spacing={0} flex="1" width="100%">
        <Text as="label" fontSize="xs" margin="0" fontWeight="600">
          По:
        </Text>
        <Input
          type="date"
          value={selectedFilter.endDate.split('T')[0]}
          onChange={(e) => handleSelect('endDate', e.target.value)}
          min={getMinEndDate()}
          max={
            rangeDate.last_upload_date
              ? rangeDate.last_upload_date.split('T')[0]
              : new Date().toISOString()
          }
        />
      </Stack>
      <IconButton
        icon={<SearchIcon />}
        aria-label="Search webletters"
        colorScheme="blue"
        type="submit"
        width={{ base: '100%', md: 'auto', xl: 'auto' }}
        mt={{ base: '10px', md: '0' }}
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
