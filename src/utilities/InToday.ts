import { Between } from 'typeorm'
import DateUtil from './DateUtil'

const InToday = () => {
  const today = DateUtil.today()
  const todayStr = [
    today.getUTCFullYear(),
    String(today.getUTCMonth() + 1).padStart(2, '0'),
    String(today.getUTCDate()).padStart(2, '0'),
  ].join('-')
  const tomorrowStr = [
    today.getUTCFullYear(),
    String(today.getUTCMonth() + 1).padStart(2, '0'),
    String(today.getUTCDate() + 1).padStart(2, '0'),
  ].join('-')

  return Between(todayStr, tomorrowStr)
}

export default InToday
