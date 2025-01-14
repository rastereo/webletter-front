import { MainApi } from '@shared/api';

import { ResultWebletter } from '../../../types';

export async function getWebletterInfo(
  mainApi: MainApi | null,
  setInfo: (value: React.SetStateAction<ResultWebletter | null>) => void,
  setErrorMessage: (value: React.SetStateAction<string | null>) => void,
  id: string
) {
  try {
    if (!mainApi) {
      throw new Error('MainApi not found');
    }

    const data = await mainApi.getWebletterInfo(id);

    setInfo(data);
  } catch (err) {
    if (err instanceof Error) setErrorMessage(err.message);
  }
}
