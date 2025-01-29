import { Tag } from '@chakra-ui/react';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Tag colorScheme="red" size="lg" fontSize="32px" h="100%">
      {message}
    </Tag>
  );
}
