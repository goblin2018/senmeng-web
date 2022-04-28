import { Form, Input, Modal } from 'antd'
import React from 'react'
import API from 'api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { openMaterialsModal } from './materialsSlice'

const { Item } = Form
const MaterialsModal = () => {
  const visible = useAppSelector(state => state.materials.showModal)
  const dispatch = useAppDispatch()
  const cancel = () => {
    dispatch(openMaterialsModal(false))
  }

  const [mForm] = Form.useForm()

  const submit = () =>
    mForm.validateFields().then(() => {
      console.log(mForm.getFieldsValue())

      // API.addMaterials(mForm.getFieldsValue())
    })
  return (
    <>
      <Modal visible={visible} onCancel={cancel} onOk={submit} title="添加物料" getContainer={false}>
        <Form form={mForm} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ unit: 'pcs' }}>
          <Item label="物料名称" name="name" rules={[{ required: true, message: '请输入物料名称' }]}>
            <Input />
          </Item>
          <Item label="物料编码" name="code" rules={[{ required: true, message: '请输入物料编码' }]}>
            <Input />
          </Item>
          <Item label="供应商" name="supplier_id" rules={[{ required: true, message: '请选择供应商' }]}>
            <Input />
          </Item>
          <Item label="参数描述" name="desc" rules={[{ required: true, message: '请输入参数' }]}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item label="单位" name="unit" rules={[{ required: true, message: '请输入单位' }]}>
            <Input />
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default MaterialsModal
