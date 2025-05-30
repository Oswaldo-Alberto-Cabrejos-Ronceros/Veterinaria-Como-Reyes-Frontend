import type { Headquarter } from '@/services/Headquarter/domain/models/Headquarter'
import type { Headquarter as HeadquarterView } from '@/models/Headquarter'

export class HeadquarterAdapter {
  static toHeadquarterView(headquarter: Headquarter): HeadquarterView {
    return {
      id: headquarter.headquarterId,
      name: headquarter.name,
      phone: headquarter.phone,
      address: headquarter.address,
      email: headquarter.email,
      district: headquarter.district,
      province: headquarter.province,
      departament: headquarter.department,
    }
  }
}
