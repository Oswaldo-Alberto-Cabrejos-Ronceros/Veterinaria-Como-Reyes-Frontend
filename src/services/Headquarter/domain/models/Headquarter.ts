export interface Headquarter {
  headquarterId: number
  name: string
  phone: string
  address: string
  email: string
  district: string
  province: string
  department: string
}

export interface HeadquarterRequest {
  name: string
  phone: string
  address: string
  email: string
  district: string
  province: string
  department: string
}

export interface HeadquarterList{
    headquarterId:number;
    name:string;
    phone:string;
    address:string;
    email:string;
    district:string;
    province:string;
}
