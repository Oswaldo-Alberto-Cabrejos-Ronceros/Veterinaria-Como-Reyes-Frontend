import type { Category } from '@/models/Category'

export interface CategoryService {
  getAllCategories(): Promise<Category[]>

  getCategoryById(id: number): Promise<Category>

  createCategory(category: Category): Promise<Category>

  updateCategory(id: number, category: Category): Promise<Category>

  deleteCategory(id: number): Promise<void>
}
