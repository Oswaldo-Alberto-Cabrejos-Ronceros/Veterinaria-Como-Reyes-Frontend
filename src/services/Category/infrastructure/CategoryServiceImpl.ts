import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Category, CategoryRequest } from '../domain/models/Category'
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

  async createCategory(categoryRequest: CategoryRequest): Promise<Category> {
    const response = await this.httpClient.post<Category>(this.urlBase, categoryRequest)
    return response.data
  }

  async updateCategory(id: number, categoryRequest: CategoryRequest): Promise<Category> {
    const response = await this.httpClient.put<Category>(`${this.urlBase}/${id}`, categoryRequest)
    return response.data
  }

  async deleteCategory(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${id}`)
  }
}
