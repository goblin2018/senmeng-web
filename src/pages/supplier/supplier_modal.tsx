import { Form, Input, message, Modal, notification } from 'antd'
import API from 'api'
import { ErrCode } from 'api/constants'
import { Supplier } from 'api/supplier'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'store'
import { OpenSupplierModal } from 'store/suppliers'
import { notifyCode } from 'utils/errcode'

const { Item } = Form
const SupplierModal = () => {
  const dispatch = useDispatch()
  const visible = useSelector((state: State) => state.suppliers.showModal)
  const isEdit = useSelector((state: State) => state.suppliers.isEdit)
  const editSupplier = useSelector((state: State) => state.suppliers.editSupplier)
  const [sForm] = Form.useForm()
  const cancel = () => {
    dispatch(OpenSupplierModal(false))
  }

  useEffect(() => {
    // 打开
    if (visible) {
      if (isEdit) {
        // 编辑 设置初始化值
        sForm.setFieldsValue(editSupplier)
      }
    } else {
      // 关闭
      sForm.resetFields()
    }
  }, [visible, isEdit])

  const submit = () =>
    sForm.validateFields().then(() => {
      if (isEdit) {
        // 修改供应商
        let nS = {
          ...editSupplier,
          ...sForm.getFieldsValue()
        } as Supplier
        if (nS.name === editSupplier?.name && nS.supplier_id === editSupplier.supplier_id) {
          notification.info({ message: '通知', description: `未修改供应商 ${nS.name} 的信息。` })
          cancel()
          return
        }
        API.updateSupplier(nS).then(res => {
          let r = notifyCode(res.data.code, '修改供应商成功!', '修改供应商失败，已存在相同的供应商信息。')
          if (r) {
            API.listSupplier({ offset: 0, limit: 10 })
            cancel()
          }
        })
      } else {
        // 添加供应商
        let s = sForm.getFieldsValue() as Supplier
        API.addSupplier(s).then(res => {
          let r = notifyCode(
            res.data.code,
            `添加供应商 ${s.name} 成功！`,
            `添加供应商 ${s.name} 失败，已存在相同的供应商信息。`
          )
          if (r) {
            API.listSupplier({ offset: 0, limit: 10 })
            cancel()
          }
        })
      }
    })
  return (
    <>
      <Modal visible={visible} title={isEdit ? '编辑供应商' : '添加供应商'} onCancel={cancel} onOk={submit}>
        <Form form={sForm} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
          <Item label="供应商编码" name="supplier_id" rules={[{ required: true, message: '请输入供应商编码' }]}>
            <Input />
          </Item>
          <Item label="供应商名称" name="name" rules={[{ required: true, message: '请输入供应商名称' }]}>
            <Input />
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default SupplierModal
