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

interface ShareButton {
  id: string;
  url: string;
}

function ShareButton({ id, url }: ShareButton) {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  useEffect(() => setValue(`${url}/webletter/${id}`), []);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          colorScheme="purple"
          variant="solid"
          sx={{ position: 'absolute', right: 0 }}
        >
          Поделиться
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text><b>Прямая ссылка на письмо:</b></Text>
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
  );
}

export default ShareButton;
