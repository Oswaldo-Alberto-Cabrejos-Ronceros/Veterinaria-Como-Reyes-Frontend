import type { Animal } from "@/services/Animal/domain/models/Animal";
import type { Pet as PetView } from "@/models/Pet";
export class AnimalAdapter {
    static toPetView(animal:Animal):PetView{
        return {
            id: animal.animalId,
            name:animal.name,
            gender:animal.gender,
            weight:animal.weight,
            birthdate:animal.birthDate,
            comment:animal.animalComment,
            urlImage:animal.urlImage,
            specie:{
                id:animal.breed.specie.specieId,
                name:animal.breed.specie.name
            },
            breed:{
                id:animal.breed.breedId,
                name:animal.breed.name
            },
            clientId:animal.clientId
        }
    }
}