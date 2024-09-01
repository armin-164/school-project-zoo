import { useParams } from "react-router-dom"
import { Header } from "./Header"
import { useState } from "react";
import { IAnimal } from "../models/IAnimal";

export const AnimalPage = () => {
    const storedAnimals = JSON.parse(localStorage.getItem("animals") || "[]");

    const [animals, setAnimals] = useState<IAnimal[]>([...storedAnimals]);
  
    const params = useParams();
  
    const foundAnimal = animals.find(
      (animal) => animal.id.toString() === params.id
    );

    return (
        <>
        <Header></Header>
        {!foundAnimal ? (
            <p>Animal not found</p>
        ) : (
            <>
            <h3>{foundAnimal.name}</h3>
            <span>{foundAnimal.latinName}</span>
            <img src={foundAnimal.imageUrl} alt={foundAnimal.latinName} className="animal-img"/>
            <p>{foundAnimal.longDescription}</p>
            <p>{foundAnimal.lastFed}</p>
            <button>Feed</button>
            </>
        )}
        </>
    )
}