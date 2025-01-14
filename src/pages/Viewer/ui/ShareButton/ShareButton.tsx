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
  handleSavePDFButton: () => void;
}

function ShareButton({ id, handleSavePDFButton }: ShareButton) {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  const downloadLink = `${
    process.env.NODE_ENV === 'development'
      ? import.meta.env.VITE_APP_DEV_SERVER_BASE_URL
      : import.meta.env.VITE_APP_SERVER_BASE_URL
  }${import.meta.env.VITE_APP_WEBLETTERS_PATH}/${id}/download`;

  useEffect(
    () => setValue(`${import.meta.env.VITE_APP_WEBLETTER_URL}/${id}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Flex mb={2} paddingBottom="5px">
                <Input value={value} readOnly mr={2} />
                <IconButton
                  aria-label="Copy link"
                  icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                  colorScheme={hasCopied ? 'green' : 'gray'}
                  onClick={onCopy}
                />
              </Flex>
              <Button
                as="a"
                href={downloadLink}
                download
                width="100%"
                aria-label="Download archive"
                variant="solid"
                colorScheme="pink"
                mb={2}
              >
                Скачать архив
              </Button>
              <Button
                type="button"
                width="100%"
                aria-label="Download pdf file"
                variant="solid"
                colorScheme="pink"
                onClick={() => handleSavePDFButton()}
              >
                Скачать PDF
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </div>
  );
}

export default ShareButton;
