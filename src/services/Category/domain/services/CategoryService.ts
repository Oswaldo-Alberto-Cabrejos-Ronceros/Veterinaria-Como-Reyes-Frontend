import type { Category, CategoryRequest } from '../models/Category'

export interface CategoryService {
  getAllCategories(): Promise<Category[]>

  getCategoryById(id: number): Promise<Category>

  createCategory(categoryRequest: CategoryRequest): Promise<Category>

  updateCategory(id: number, categoryRequest: CategoryRequest): Promise<Category>

  deleteCategory(id: number): Promise<void>

  activateCategory(categoryId: number): Promise<void>
}
