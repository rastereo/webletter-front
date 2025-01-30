import { Heading } from '@chakra-ui/react';

import useDocumentTitle from '@shared/lib/useDocumentTitle';

import './NotFound.scss';
import { ErrorMessage } from '@/widgets/ErrorMessage';

export function NotFound() {
  useDocumentTitle('Page Not Found', true);

  return (
    <main className="not-found">
      <Heading
        as="h1"
        textAlign="center"
        display="flex"
        flexDir="column"
        fontSize="70px"
      >
        404
        <ErrorMessage message="Page Not Found" />
      </Heading>
    </main>
  );
}
