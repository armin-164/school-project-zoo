import { IAnimal } from "../models/IAnimal";

const BASE_URL = "https://animals.azurewebsites.net/api/animals";

export const getData = async (): Promise<IAnimal[]> => {
    const response = await fetch(BASE_URL);
    const result: IAnimal[] = await response.json();
    return result;
};
