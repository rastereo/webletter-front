import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { MdViewList, MdViewModule } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/store';
import { setViewMode } from '@/entities/webletterList';
import { useEffect } from 'react';

function ViewSwitcher() {
  const dispatch = useDispatch();

  const { viewMode } = useSelector((state: RootState) => state.webletterList);

  function switchViewMode(value: 'table' | 'card') {
    dispatch(setViewMode(value));

    localStorage.setItem('viewMode', value);
  }

  function setUserViewMode() {
    if (window.innerWidth < 768) {
      switchViewMode('card');
    } else if (localStorage.getItem('viewMode')) {
      switchViewMode(localStorage.getItem('viewMode') as 'table' | 'card');
    }
  }

  useEffect(() => {
    setUserViewMode();

    window.addEventListener('resize', setUserViewMode);

    return () => window.removeEventListener('resize', setUserViewMode);
  }, []);

  return (
    <RadioGroup
      onChange={switchViewMode}
      value={viewMode}
      display={{ base: 'none', md: 'block' }}
    >
      <Stack direction="row" justifyContent="flex-end" pb={2}>
        <Radio value="table" size="lg">
          <MdViewList />
        </Radio>
        <Radio value="card" size="lg">
          <MdViewModule />
        </Radio>
      </Stack>
    </RadioGroup>
  );
}

export default ViewSwitcher;
