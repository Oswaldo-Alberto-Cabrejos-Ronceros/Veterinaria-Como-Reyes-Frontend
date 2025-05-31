export interface Breed {
  breedId: number
  name: string
  specie: {
    specieId: number,
    name:string,
    imagePath:string
  }
}
