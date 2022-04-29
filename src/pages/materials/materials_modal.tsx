import { Form, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { listMaterials, openMaterialsModal } from './materialsSlice'
import API from 'api'
import { notifyCode } from 'utils/errcode'
import { Materials } from 'api/materials'

const { Item } = Form
const { Option } = Select
const MaterialsModal = () => {
  const dispatch = useAppDispatch()
  const visible = useAppSelector(state => state.materials.showModal)
  const isEdit = useAppSelector(state => state.materials.isEdit)
  const editMaterials = useAppSelector(state => state.materials.editMaterials)
  const cancel = () => {
    dispatch(openMaterialsModal(false))
  }

  const [mForm] = Form.useForm()

  const suppliers = useAppSelector(state => state.materials.allSuppliers)
  const [inputs, setInputs] = useState<HTMLElement[]>([])

  useEffect(() => {
    if (visible) {
      let tmpIs: HTMLElement[] = []
      const is = document.getElementsByClassName('iii')
      for (let n = 0; n < is.length; n++) {
        tmpIs.push(is[n] as HTMLElement)
      }
      setInputs(tmpIs)

      setTimeout(() => {
        tmpIs[0].focus()
      })

      if (isEdit) {
        mForm.setFieldsValue(editMaterials)
      }
    } else {
      mForm.resetFields()
    }
  }, [visible, isEdit])

  const submit = () =>
    mForm.validateFields().then(() => {
      if (isEdit) {
      } else {
        let m = mForm.getFieldsValue() as Materials

        API.addMaterials(m).then(res => {
          console.log(res)

          let r = notifyCode(
            res.data.code,
            `添加物料 ${m.name}成功！`,
            `添加物料 ${m.name} 失败，已存在相同信息的物料。`
          )

          if (r) {
            dispatch(listMaterials())
            cancel()
          }
        })
      }
    })

  // 捕获enter键
  const handleKeyUp = e => {
    if (e.keyCode !== 13) {
      return
    }
    let index = inputs.indexOf(e.target)
    if (index < inputs.length - 1) {
      let it = inputs[index + 1]
      it.focus()
    } else {
      submit()
    }
  }
  return (
    <>
      <Modal visible={visible} onCancel={cancel} onOk={submit} title="添加物料" getContainer={false} forceRender>
        <Form
          form={mForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ unit: 'pcs' }}
          onKeyUp={handleKeyUp}
          autoComplete="off"
        >
          <Item label="物料名称" name="name" rules={[{ required: true, message: '请输入物料名称' }]}>
            <Input className="iii" />
          </Item>
          <Item label="物料编码" name="code" rules={[{ required: true, message: '请输入物料编码' }]}>
            <Input className="iii" />
          </Item>
          <Item label="供应商" name={['supplier', 'id']} rules={[{ required: true, message: '请选择供应商' }]}>
            <Select
              showSearch
              filterOption={(input, option) => (option as any).children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {suppliers?.map(s => (
                <Option value={s.id} key={s.id}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item label="参数描述" name="desc" rules={[{ required: true, message: '请输入参数' }]}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} className="iii" />
          </Item>
          <Item label="单位" name="unit" rules={[{ required: true, message: '请输入单位' }]}>
            <Input className="iii" />
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default MaterialsModal
