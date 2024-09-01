import { IAnimal } from '../models/IAnimal';

const BASE_URL = 'https://animals.azurewebsites.net/api/animals';

export const getData = async (): Promise<IAnimal[]> => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Error code: ${response.status}`);
    }

    const result: IAnimal[] = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};
