import { Heading, Tag } from '@chakra-ui/react';

import useDocumentTitle from '@shared/lib/useDocumentTitle';

import './NotFound.css';

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
        <Tag colorScheme="red" size="lg" fontSize="32px">
          Page Not Found
        </Tag>
      </Heading>
    </main>
  );
}
