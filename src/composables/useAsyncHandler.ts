import { reactive } from 'vue'

type LoadingState = Record<string, boolean>
type ErrorState = Record<string, unknown>

export function useAsyncHandler() {
  // for loading state
  const loading = reactive<LoadingState>({})
  //for error state
  const error = reactive<ErrorState>({})
  //higher orden fuction for run use case
  async function runUseCase<T>(name: string, fn: () => Promise<T>):Promise<T> {
    loading[name] = true
    error[name] = null
    try {
      const result = await fn()
      return result
    } catch (e) {
      error[name] = e
      throw e
    } finally {
      loading[name] = false
    }
  }
  return { loading, error, runUseCase }
}
