export class DateAdapter {
  static toDateYYYYmmDD(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  static toTimeHHmmSS(date: Date): string {
    //14:30:00
    return date.toTimeString().split(' ')[0]
  }
}
