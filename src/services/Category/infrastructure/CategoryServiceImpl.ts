import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Category } from '../domain/models/Category'
import type { CategoryService } from '../domain/services/CategoryService'

export class CategoryServiceImpl implements CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  private urlBase = '/categories'

  async getAllCategories(): Promise<Category[]> {
    const response = await this.httpClient.get<Category[]>(this.urlBase)
    return response.data
  }

  async getCategoryById(id: number): Promise<Category> {
    const response = await this.httpClient.get<Category>(`${this.urlBase}/${id}`)
    return response.data
  }

  async createCategory(category: Category): Promise<Category> {
    const response = await this.httpClient.post<Category>(this.urlBase, category)
    return response.data
  }

  async updateCategory(id: number, category: Category): Promise<Category> {
    const response = await this.httpClient.put<Category>(`${this.urlBase}/${id}`, category)
    return response.data
  }

  async deleteCategory(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${id}`)
  }
}
