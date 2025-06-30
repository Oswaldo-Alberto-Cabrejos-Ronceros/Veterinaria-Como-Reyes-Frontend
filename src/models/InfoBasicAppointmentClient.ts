export interface InfoBasicAppointmentClient{
    id:number
  date:string
  time:string
  animal:{
    name:string
  }
  service:{
    name:string
    description:string
    image:string
  }
  categoryService:{
    name:string
  }
  status:string
  duration:number
}
