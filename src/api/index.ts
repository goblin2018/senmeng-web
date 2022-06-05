import * as user from 'api/user'
import * as materials from 'api/materials'
import * as supplier from 'api/supplier'
import * as operation from 'api/operation'
import * as price from 'api/price'
import * as moq from 'api/moq'
const API = {
  ...user,
  ...materials,
  ...supplier,
  ...operation,
  ...price,
  ...moq
}

export default API
