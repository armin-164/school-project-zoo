import { useEffect, useState } from 'react';
import { IAnimal } from '../models/IAnimal';
import { getData } from '../services/zooService';
import '../styles/Homepage.css';
import { Spinner } from './Spinner';

export const Homepage = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnimals = async () => {
      if (fetched) return;

      const localStorageData = localStorage.getItem('animals');
      if (localStorageData) {
        setAnimals(JSON.parse(localStorageData));
        setFetched(true);
      } else {
        const data = await getData();
        localStorage.setItem('animals', JSON.stringify(data));
        setAnimals(data);
        setFetched(true);
      }
    };

    fetchAnimals();
  });

  return (
    <>
      <main>
        {!fetched ? (
          <Spinner></Spinner>
        ) : (
          <div className="animals">
            {animals.map((animal) => (
              <div key={animal.id} className="animal-container">
                <h2>{animal.name}</h2>
                <img src={animal.imageUrl} alt={animal.latinName} />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};
