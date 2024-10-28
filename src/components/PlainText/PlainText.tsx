import { Highlight, FormControl, FormLabel, Switch } from '@chakra-ui/react';

import './PlainText.css';

interface PlainTextProps {
  text: string;
  misspelledWords: string[];
  stopWords: string[];
  isText: boolean;
  isMisspelledWords: boolean;
  isStopWords: boolean;
  handleIsMisspelledWords: () => void;
  handleIsStopWords: () => void;
}

function PlainText({
  text,
  misspelledWords,
  stopWords,
  isText,
  isMisspelledWords,
  isStopWords,
  handleIsMisspelledWords,
  handleIsStopWords,
}: PlainTextProps) {
  return (
    <section className={`plain-text ${!isText && 'hide'}`}>
      <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-end"
        width="100%"
        pb="10px"
      >
        <FormLabel htmlFor="checker" mb="0">
          Проверка орфографии
          <Switch
            id="spell-checker"
            colorScheme="teal"
            isChecked={isMisspelledWords}
            onChange={() => handleIsMisspelledWords()}
            pl="5px"
          />
        </FormLabel>
        <FormLabel htmlFor="stop-words" mb="0">
          Стоп-слова
          <Switch
            id="stop-words"
            colorScheme="teal"
            isChecked={isStopWords}
            onChange={() => handleIsStopWords()}
            pl="5px"
          />
        </FormLabel>
      </FormControl>
      <p className="plain-text__content">
        <Highlight
          query={
            isMisspelledWords ? misspelledWords : isStopWords ? stopWords : ''
          }
          styles={{
            px: '2',
            py: '1',
            rounded: 'full',
            bg: `${isMisspelledWords ? 'red.100' : isStopWords && 'blue.100'}`,
          }}
        >
          {text}
        </Highlight>
      </p>
    </section>
  );
}

export default PlainText;
