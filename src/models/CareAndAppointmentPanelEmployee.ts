export interface CareAndAppointmentPanelEmployee {
  id: number
  type: string
  pet: {
    name: string
  }
  serviceName: string
  clientName: string
  date: string
  hour: string
  status: string
}
