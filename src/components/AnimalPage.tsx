import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { useEffect, useState } from 'react';
import { IAnimal } from '../models/IAnimal';
import '../styles/AnimalPage.css';

export const AnimalPage = () => {
  const storedAnimals = JSON.parse(localStorage.getItem('animals') || '[]');

  const [animals, setAnimals] = useState<IAnimal[]>([...storedAnimals]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) => {
          const lastFedTime = new Date(animal.lastFed).getTime();
          const timeElapsed = (Date.now() - lastFedTime) / 1000;

          if (timeElapsed >= 5 && animal.isFed === true) {
            return { ...animal, isFed: false };
          }

          return animal;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [animals]);

  useEffect(() => {
    localStorage.setItem('animals', JSON.stringify(animals));
  }, [animals]);

  const params = useParams();

  const foundAnimal = animals.find(
    (animal) => animal.id.toString() === params.id
  );

  const handleFeed = () => {
    if (foundAnimal) {
      const updatedAnimal = {
        ...foundAnimal,
        lastFed: new Date().toLocaleString(),
        isFed: true,
      };

      const updatedAnimalsArray = animals.map((animal) =>
        animal.id === foundAnimal.id ? updatedAnimal : animal
      );

      setAnimals(updatedAnimalsArray);

      localStorage.setItem('animals', JSON.stringify(updatedAnimalsArray));
    }
  };

  return (
    <>
      <Header></Header>
      {!foundAnimal ? (
        <p>Animal not found</p>
      ) : (
        <>
          <div className="animal-page-container">
            <h3>{foundAnimal.name}</h3>
            <span>{foundAnimal.latinName}</span>
            <img
              src={foundAnimal.imageUrl}
              alt={foundAnimal.latinName}
              className="animal-img"
            />
            <p className="long-description">{foundAnimal.longDescription}</p>
            <p className="last-fed-timestamp">
              Last Fed: {foundAnimal.lastFed}
            </p>
            <button onClick={handleFeed} disabled={foundAnimal.isFed === true}>
              Feed
            </button>
          </div>
        </>
      )}
    </>
  );
};
