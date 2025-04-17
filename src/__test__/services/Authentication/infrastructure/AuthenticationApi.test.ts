import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthApi } from '@/services/Authentication/infrastructure/AuthenticationApi'
import type { User, UserRequest } from '@/services/Authentication/domain/models/User'
describe('AuthApi', () => {
  beforeEach(() => {
    //cleaning all mocks before that test
    vi.restoreAllMocks()
  })

  it('should log in successfully and return user', async () => {
    //mock response
    const mockResponse: User = {
      id: 123,
      name: 'Oswaldo Alberto',
      lastname: 'Cabrejos Ronceros',
      rol: 'ADMIN',
    }
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            user: mockResponse,
          }),
      } as Response),
    )

    const authApi = new AuthApi()
    const user = await authApi.login('OswC@gmail.com', '123456')
    expect(user).toEqual(mockResponse)

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'OswC@gmail.com', password: '123456' }),
    })
  })
  it('should register successfully and return user', async () => {
    //mock response
    const mockResponse: User = {
      id: 123,
      name: 'Oswaldo Alberto',
      lastname: 'Cabrejos Ronceros',
      rol: 'ADMIN',
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            user: mockResponse,
          }),
      } as Response),
    )

    const authApi = new AuthApi()
    const userRegister: UserRequest = {
      dni: '78451223',
      names: 'Oswaldo Alberto',
      lastnames: 'Cabrejos Ronceros',
      email: 'OswCab@gmail.com',
      address: 'Direccion',
      cellphone: '984123125',
      password: '122456',
    }

    const user = await authApi.register(userRegister)

    expect(user).toEqual(mockResponse)
    expect(fetch).toBeCalledWith('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userRegister),
    })
  });
  it('should logout sucessfully', async ()=>{
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200
      } as Response),
    );
    const authApi=new AuthApi();
    await authApi.logout();
    expect(fetch).toBeCalledWith('http://localhost:8080/api/auth/logout',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  })
})
