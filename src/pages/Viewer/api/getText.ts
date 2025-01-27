import { mainApi } from '@shared/api';

export async function getText(
  id: string,
  setText: (value: React.SetStateAction<string | null>) => void,
  setMisspelledWords: (value: React.SetStateAction<string[] | []>) => void,
  setStopWords: (value: React.SetStateAction<string[] | []>) => void,
  setErrorMessage: (value: React.SetStateAction<string | null>) => void
) {
  try {
    const { text, misspelledWords, stopWordsInText } =
      await mainApi.getWebletterText(id);

    setText(text);
    setMisspelledWords(misspelledWords);
    setStopWords(stopWordsInText);
  } catch (err) {
    if (err instanceof Error) setErrorMessage(err.message);
  }
}
