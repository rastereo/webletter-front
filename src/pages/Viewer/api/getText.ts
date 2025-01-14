import { MainApi } from '@shared/api';

export async function getText(
  mainApi: MainApi | null,
  id: string,
  setText: (value: React.SetStateAction<string | null>) => void,
  setMisspelledWords: (value: React.SetStateAction<string[] | []>) => void,
  setStopWords: (value: React.SetStateAction<string[] | []>) => void,
  setErrorMessage: (value: React.SetStateAction<string | null>) => void
) {
  try {
    if (!mainApi) {
      throw new Error('MainApi not found');
    }

    const { text, misspelledWords, stopWordsInText } =
      await mainApi.getWebletterText(id);

    setText(text);
    setMisspelledWords(misspelledWords);
    setStopWords(stopWordsInText);
  } catch (err) {
    if (err instanceof Error) setErrorMessage(err.message);
  }
}
