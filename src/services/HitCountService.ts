import { HitCount } from '../entity/HitCount'
import InToday from '../utilities/InToday'

export class HitCountService {
  private static normalizePathname(pathname: string) {
    return pathname.replace(/^\/|\/$/g, '').toLowerCase()
  }

  public static async isHitToday(remoteAddress: string, pathname: string) {
    pathname = this.normalizePathname(pathname)

    return Boolean(
      await HitCount.count({
        where: {
          remoteAddress,
          pathname: pathname,
          accessedAt: InToday(),
        },
      })
    )
  }

  public static async stamp(remoteAddress: string, pathname: string) {
    pathname = this.normalizePathname(pathname)

    if (!(await this.isHitToday(remoteAddress, pathname))) {
      const hitCount = new HitCount(remoteAddress, pathname)
      await hitCount.save()
    }

    return HitCount.count({ where: { pathname } })
  }

  public static async count(pathname: string) {
    pathname = this.normalizePathname(pathname)

    return await HitCount.count({
      where: {
        pathname: pathname,
        accessedAt: InToday(),
      },
    })
  }
}
