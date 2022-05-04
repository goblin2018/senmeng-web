import { notification } from 'antd'
import { ErrCode } from 'api/constants'

export const notifyCode = (code: number, success: string, fail: string): boolean => {
  if (code === ErrCode.OK) {
    notification.success({ message: '操作成功', description: success })
    return true
  } else {
    notification.error({ message: '操作失败', description: fail })
  }
  return false
}
