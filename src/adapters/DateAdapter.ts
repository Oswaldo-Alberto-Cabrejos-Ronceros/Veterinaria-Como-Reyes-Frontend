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

  static fromHHmmSSToDate(time: string): Date | null {
    const [hours, minutes, seconds] = time.split(':').map(Number)

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      console.error('Formato de hora inválido:', time)
      return null
    }

    const date = new Date()
    date.setHours(hours, minutes, seconds, 0)
    return date
  }
}
