import { useParams } from "react-router-dom"
import { Header } from "./Header"
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import "../styles/AnimalPage.css";

export const AnimalPage = () => {
    const storedAnimals = JSON.parse(localStorage.getItem("animals") || "[]");

    const [animals, setAnimals] = useState<IAnimal[]>([...storedAnimals]);
    

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimeSinceFed: { [id: number]: number } = {};
            const updatedAnimals = animals.map(animal => {
            const lastFedTime = new Date(animal.lastFed).getTime();
            const currentTime = new Date().getTime();
            const timeElapsed = (currentTime - lastFedTime) / 1000;
            updatedTimeSinceFed[animal.id] = timeElapsed;
      
            if (timeElapsed >= 20) {
                return { ...animal, isFed: false };
            }
                return animal;
            });
            setAnimals(updatedAnimals);
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

            const updatedAnimalsArray = animals.map(animal =>
                animal.id === foundAnimal.id ? updatedAnimal : animal
            );

            setAnimals(updatedAnimalsArray);

            localStorage.setItem("animals", JSON.stringify(updatedAnimalsArray));
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
                <img src={foundAnimal.imageUrl} alt={foundAnimal.latinName} className="animal-img"/>
                <p className="long-description">{foundAnimal.longDescription}</p>
                <p className="last-fed-timestamp">Last Fed: {foundAnimal.lastFed}</p>
                <button onClick={handleFeed} disabled={foundAnimal.isFed === true}>Feed</button>
            </div>
            </>
        )}
        </>
    )
}
