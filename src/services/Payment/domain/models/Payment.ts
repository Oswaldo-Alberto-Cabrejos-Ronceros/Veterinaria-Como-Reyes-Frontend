export interface Payment {
  paymentId: number
  amount: number
  paymentDateTime: string
  status: string
  appointmentId: number
  careId?: number
  paymentMethodId: number
}

export interface PaymentRequest {
  amount: number
  paymentDateTime: string
  status: string
  appointmentId: number
  careId?: number
  paymentMethodId: number
}

export interface PaymentList {
  id: number
  headquarterName: string
  serviceName: string
  clientDni: string
  amount: string
  status: string
  paymentMethod: string
  paymentDate: string
}

export interface PaymentStatsForPanelAdmin {
  currentTotal: number
  previousTotal: number
  percentageDifference: string
}

export interface IncomeStatsToday {
  todayIncome: number;
}

export interface RecentPayment {
  paymentId: number;
  clientFullName: string;
  clientInitials: string;
  animalName: string;
  serviceName: string;
  amount: number;
  paymentDate: string;
  paymentTime: string;
  paymentStatus: string;
}

export interface WeeklyIncome {
  days: string[]
  totals: number[]
}
