import { Between } from 'typeorm'
import DateUtil from './DateUtil'

const InToday = () => {
  const today = DateUtil.today()
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')
  const tomorrowStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate() + 1).padStart(2, '0'),
  ].join('-')

  return Between(todayStr, tomorrowStr)
}

export default InToday
