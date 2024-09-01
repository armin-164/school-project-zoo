import { useEffect, useState } from "react"
import { IAnimal } from "../models/IAnimal"
import { getData } from "../services/zooService";

export const Homepage = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            const data = await getData();
            setAnimals(data);
        }

        fetchAnimals();
    }, []);

    return (
        <>
         <main>
                {animals.map((animal) => (
                    <div key={animal.id} className="animal-container">
                        <h2>{animal.name}</h2>
                        <img src={animal.imageUrl} alt={animal.latinName}/>
                    </div>
                ))}
            </main>
        </>
    )
}