import { categoryUsesCases } from '@/dependency-injection/category.container'
import { useAsyncHandler } from './useAsyncHandler'
import { CategoryAdapter } from '@/adapters/CategoryAdapter'
import type { Category } from '@/services/Category/domain/models/Category'
import type { Category as CategoryView } from '@/models/Category'


export function useCategory() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getAllCategories = async (): Promise<CategoryView[]> => {
    const categories: Category[] = await runUseCase('getAllCategories', () =>
      categoryUsesCases.getAllCategories.execute(),
    )
    return categories.map(CategoryAdapter.toCategoryView)
  }

  const getCategoryById = async (id: number): Promise<CategoryView> => {
    const category: Category = await runUseCase('getCategoryById', () =>
      categoryUsesCases.getCategoryById.execute(id),
    )
    return CategoryAdapter.toCategoryView(category)
  }

  //create

  //update

  const deleteCategory = async (id: number): Promise<void> => {
    await runUseCase('deleteCategory', () =>
      categoryUsesCases.deleteCategory.execute(id),
    )
  }

  return {
    loading,
    error,
    getAllCategories,
    getCategoryById,
    deleteCategory,
  }
}
