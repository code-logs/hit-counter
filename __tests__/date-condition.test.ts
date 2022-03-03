import { Connection, EntitySchema } from 'typeorm'
import { connectDatabase } from '../src/app'
import entities from '../src/entity'
import { AccessInfo } from '../src/entity/AccessInfo'
import { AccessInfoService } from '../src/services/AccessInfoService'
import InToday from '../src/utilities/InToday'

const TEST_REMOTE_ADDRESS = 'TEST_REMOTE_ADDRESS'

let connection: Connection

beforeAll(async () => {
  // Connect to database
  connection = await connectDatabase(entities as EntitySchema<unknown>[])
})

afterAll(async () => {
  // Delete test data
  await AccessInfo.delete({ remoteAddress: TEST_REMOTE_ADDRESS })
  await connection.close()
})

describe('Counting access_info test', () => {
  it('should return false', async () => {
    const isAccessed = await AccessInfoService.isAccessedToday(
      TEST_REMOTE_ADDRESS
    )
    expect(isAccessed).toEqual(false)
  })

  it('should equal to 1', async () => {
    await AccessInfoService.stamp(TEST_REMOTE_ADDRESS)
    await AccessInfoService.stamp(TEST_REMOTE_ADDRESS)

    const count = await AccessInfo.count({
      where: {
        remoteAddress: TEST_REMOTE_ADDRESS,
        accessedAt: InToday(),
      },
    })

    expect(count).toEqual(1)
  })
})
