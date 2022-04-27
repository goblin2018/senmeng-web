import * as user from 'api/user'
import * as materials from 'api/materials'
import * as supplier from 'api/supplier'
import * as operation from 'api/operation'
import * as price from 'api/price'
const API = {
  ...user,
  ...materials,
  ...supplier,
  ...operation,
  ...price
}

export default API
