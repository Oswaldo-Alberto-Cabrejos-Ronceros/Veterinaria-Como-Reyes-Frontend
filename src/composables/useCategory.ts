import { categoryUsesCases } from '@/dependency-injection/category.container'
import { useAsyncHandler } from './useAsyncHandler'
import { CategoryAdapter } from '@/adapters/CategoryAdapter'
import type { Category } from '@/services/Category/domain/models/Category'
import type { Category as CategoryView } from '@/models/Category'
import type { FormValues as CategoryAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-category'

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

  const createCategory = async (
    categoryAddEditSchema: CategoryAddEditSchema,
  ): Promise<CategoryView> => {
    const categoryRequest =
      CategoryAdapter.fromSchemaAddEditToCategoryRequest(categoryAddEditSchema)
    const category: Category = await runUseCase('createCategory', () =>
      categoryUsesCases.createCategory.execute(categoryRequest),
    )
    return CategoryAdapter.toCategoryView(category)
  }

  //update

  const updateCategory = async (
    categoryId: number,
    categoryAddEditSchema: CategoryAddEditSchema,
  ): Promise<CategoryView> => {
    const categoryRequest =
      CategoryAdapter.fromSchemaAddEditToCategoryRequest(categoryAddEditSchema)
    const category: Category = await runUseCase('updateCategory', () =>
      categoryUsesCases.updateCategory.execute(categoryId, categoryRequest),
    )
    return CategoryAdapter.toCategoryView(category)
  }

  const deleteCategory = async (id: number): Promise<void> => {
    await runUseCase('deleteCategory', () => categoryUsesCases.deleteCategory.execute(id))
  }

  const activateCategory = async (categoryId: number): Promise<void> => {
    await runUseCase('activateCategory', () =>
      categoryUsesCases.activateCategory.execute(categoryId),
    )
  }

  return {
    loading,
    error,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    createCategory,
    updateCategory,
    activateCategory,
  }
}
