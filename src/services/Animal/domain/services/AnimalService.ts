import type { Animal } from "../models/Animal";

export interface AnimalService{
    getAllAnimals():Promise<Animal[]>;
    getAnimalById(animalId:number):Promise<Animal>;
    getAnimalByClientId(clientId:number):Promise<Animal[]>;
    createAnimal(animal:Animal):Promise<Animal>;
    updateAnimal(animalId:number,animal:Animal):Promise<Animal>;
    deleteAnimal(animalId:number):Promise<void>
}