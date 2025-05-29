import type { Category } from "../domain/models/Category";
import type { CategoryService } from "../domain/services/CategoryService";

export class CreateCategory{
  constructor(private readonly categoryService:CategoryService){}

  async execute(category:Category):Promise<Category>{
   return await this.categoryService.createCategory(category)
  }
}
