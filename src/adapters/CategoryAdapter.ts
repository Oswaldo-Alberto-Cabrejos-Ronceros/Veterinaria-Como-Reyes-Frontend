import type { Category } from '@/services/Category/domain/models/Category'
import type { Category as CategoryView } from '@/models/Category'

export class CategoryAdapter {
  static toCategoryView(category: Category): CategoryView {
    return {
      id: category.categoryId,
      name: category.name,
      description: category.description,
    }
  }
}
