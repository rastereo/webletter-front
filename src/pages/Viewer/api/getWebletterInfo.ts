import { mainApi } from '@/shared/api';
import { IWebletter } from '@types';

export async function getWebletterInfo(
  setInfo: (value: React.SetStateAction<IWebletter | null>) => void,
  setErrorMessage: (value: React.SetStateAction<string | null>) => void,
  id: string
) {
  try {
    const data = await mainApi.getWebletterInfo(id);

    setInfo(data);
  } catch (err) {
    if (err instanceof Error) setErrorMessage(err.message);
  }
}
