import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { MdViewList, MdViewModule } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/store';
import { setViewMode } from '@/entities/webletterList';
import { useEffect } from 'react';

function ViewSwitcher() {
  const dispatch = useDispatch();

  const { viewMode } = useSelector((state: RootState) => state.webletterList);

  function handleChange(value: 'table' | 'card') {
    dispatch(setViewMode(value));
  }

  function handleResize() {
    if (window.innerWidth < 768) {
      handleChange('card');
    }
  }

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <RadioGroup
      onChange={handleChange}
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
