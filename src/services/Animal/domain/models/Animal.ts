export interface Animal {
  animalId: number
  name: string
  gender: string
  weight: number
  birthDate: string
  animalComment: string
  urlImage: string
  breed: {
    breedId: number
    name: string
    specie: {
      specieId: number
      name: string
    }
  }
  clientId: number
}

export interface AnimalRequest {
  name: string
  gender: string
  weight?: number
  birthDate?: string
  animalComment?: string
  urlImage?: string
  breed: {
    breedId: number
  }
  clientId: number
}


export interface AnimalByClient{
  animalId:number
  birthDate:string,
  gender:string,
  name:string,
  urlImage:string,
  weight:number,
  breedName:string,
  speciesId: number,
  speciesName:string,
  animalComment:string
}
