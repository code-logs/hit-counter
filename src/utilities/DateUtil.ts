class DateUtil {
  public static today() {
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    return date
  }

  public static tomorrow() {
    const today = this.today()
    return new Date(today.setDate(today.getDate() + 1))
  }
}

export default DateUtil
