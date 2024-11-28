import { useEffect } from 'react';
import {
  Button,
  Flex,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';

import './ShareButton.css';

interface ShareButton {
  id: string;
}

function ShareButton({ id }: ShareButton) {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () => setValue(`${import.meta.env.VITE_APP_WEBLETTER_URL}/${id}`),
    []
  );

  return (
    <div className="share-button">
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="purple" variant="solid">
            Поделиться
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Text>
                <b>Прямая ссылка на письмо:</b>
              </Text>
              <Flex mb={2}>
                <Input value={value} readOnly mr={2} />
                <IconButton
                  aria-label="Copy link"
                  icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                  colorScheme={hasCopied ? 'green' : 'gray'}
                  onClick={onCopy}
                />
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </div>
  );
}

export default ShareButton;
