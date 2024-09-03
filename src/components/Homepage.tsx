import { useEffect, useState } from 'react';
import { IAnimal } from '../models/IAnimal';
import { getData } from '../services/zooService';
import '../styles/Homepage.css';
import { Spinner } from './Spinner';
import { Header } from './Header';
import { Link } from 'react-router-dom';
import brokenImg from '../assets/broken-img.jpg';

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

  useEffect(() => {
    const interval = setInterval(() => {
        const updatedTimeSinceFed: { [id: number]: number } = {};
        const updatedAnimals = animals.map(animal => {
        const lastFedTime = new Date(animal.lastFed).getTime();
        const currentTime = new Date().getTime();
        const timeElapsed = (currentTime - lastFedTime) / 1000;
        updatedTimeSinceFed[animal.id] = timeElapsed;
  
        if (timeElapsed >= 20) {
            alert(`${animal.name} needs to be fed again`)
            return { ...animal, isFed: false };
        }
            return animal;
        });
        setAnimals(updatedAnimals);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [animals]);

  useEffect(() => {
    if (fetched) {
      localStorage.setItem('animals', JSON.stringify(animals));
    }
  }, [animals, fetched]);

  return (
    <>
    <Header></Header>
      <main>
        {!fetched ? (
          <Spinner></Spinner>
        ) : (
          <div className="animals">
            {animals.map((animal, index) => (
              <div key={animal.id} className={`animal-container ${animal.isFed ? 'fed' : 'not-fed'}`}>
                <h2>{animal.name}</h2>
                <img src={animal.imageUrl} alt={animal.latinName} onError={(e) => e.currentTarget.src = brokenImg} />
                <p>{animal.shortDescription}</p>
                <Link to={`animals/${animal.id.toString()}`} key={index.toString()}>Mer</Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};
