import { Spinner } from '@chakra-ui/react';

import './Loader.scss';

export function Loader() {
  return (
    <div className="loader">
      <Spinner size="xl" color="#e6e6e6" />
    </div>
  );
}
