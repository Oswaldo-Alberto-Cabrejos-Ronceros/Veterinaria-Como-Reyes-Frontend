import { breedUsesCases } from "@/dependency-injection/breed.container";
import { useAsyncHandler } from "./useAsyncHandler";
import type { Breed } from "@/services/Breed/domain/models/Breed";
import type { Breed as BreedView } from "@/models/Breed";
import { BreedAdapter } from "@/adapters/BreedAdapter";

export function useBreed(){
    //get from useAsyncHandle
    const { loading, error, runUseCase } = useAsyncHandler()

      //expose use cases

  //create


  const deleteBreed = async(breedId:number)=>{
    await runUseCase('deleteBreed',()=>breedUsesCases.deleteBreed.execute(breedId))
  }

  const getAllBreeds = async ():Promise<BreedView[]>=>{
    const breeds:Breed[] = await runUseCase('getAllBreeds',()=>
    breedUsesCases.getAllBreeds.execute()
    )
    return breeds.map((breed)=> BreedAdapter.toBreedView(breed))
  }

  const getBreedByUd = async(breedId:number):Promise<BreedView>=>{
    const breed:Breed = await runUseCase('getBreedByUd',()=>
    breedUsesCases.getBreedById.execute(breedId)
    )
    return BreedAdapter.toBreedView(breed)
  }

  const getBreedsBySpecie = async(specieId:number):Promise<BreedView[]>=>{
    const breeds:Breed[] = await runUseCase('getBreedsBySpecie',()=>
    breedUsesCases.getBreedsBySpecie.execute(specieId)
    )
    return breeds.map((breed)=>BreedAdapter.toBreedView(breed))
  }

  //update

  return{
    loading,
    error,
    deleteBreed,
    getAllBreeds,
    getBreedByUd,getBreedsBySpecie
  }
}
