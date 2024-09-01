import { useEffect, useState } from 'react';
import { IAnimal } from '../models/IAnimal';
import { getData } from '../services/zooService';
import '../styles/Homepage.css';

export const Homepage = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnimals = async () => {
      const data = await getData();
      setAnimals(data);
      setFetched(true);
    };

    if (fetched) return;

    fetchAnimals();
  });

  return (
    <>
      <main>
        <div className='animals'>
          {animals.map((animal) => (
            <div key={animal.id} className="animal-container">
              <h2>{animal.name}</h2>
              <img src={animal.imageUrl} alt={animal.latinName} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
