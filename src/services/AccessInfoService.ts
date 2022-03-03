import { AccessInfo } from '../entity/AccessInfo'
import InToday from '../utilities/InToday'

export class AccessInfoService {
  public static async isAccessedToday(remoteAddress: string) {
    return Boolean(
      await AccessInfo.count({
        where: {
          remoteAddress,
          accessedAt: InToday(),
        },
      })
    )
  }

  public static async stamp(remoteAddress: string) {
    if (!(await this.isAccessedToday(remoteAddress))) {
      const accessInfo = new AccessInfo(remoteAddress, new Date())
      await accessInfo.save()
    }
  }
}
