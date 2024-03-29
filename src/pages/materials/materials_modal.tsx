import { Button, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { clearCopyMaterials, closeMaterialsModal, listMaterials } from './materialsSlice'
import API from 'api'
import { notifyCode } from 'utils/errcode'
import { Materials } from 'api/materials'
import { CopyTwoTone } from '@ant-design/icons'

const { Item } = Form
const { Option } = Select
const MaterialsModal = () => {
  const dispatch = useAppDispatch()
  const { showModal: visible, isEdit, editMaterials, copyMaterials } = useAppSelector(state => state.materials)
  const cancel = () => {
    dispatch(closeMaterialsModal())
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
      mForm.setFieldsValue({ buyType: '采购', tax: '0' })
    }
  }, [visible, isEdit])

  const submit = () =>
    mForm.validateFields().then(() => {
      if (isEdit) {
        let m = mForm.getFieldsValue() as Materials
        if (
          m.code === editMaterials?.code &&
          m.desc === editMaterials.desc &&
          m.name === editMaterials.name &&
          m.short_name === editMaterials.short_name &&
          m.unit === editMaterials.unit &&
          m.buyType == editMaterials.buyType &&
          m.tax == editMaterials.tax
        ) {
          notification.info({
            message: '通知',
            description: `未修改物料 ${m.name} 的信息。 `
          })
          cancel()
          return
        }

        let newM = {
          ...editMaterials,
          ...m
        }
        newM.tax = parseInt(mForm.getFieldValue('tax'))
        console.log('get new material', newM)

        API.updateMaterials(newM).then(res => {
          let r = notifyCode(
            res.data.code,
            `修改物料 ${newM.name}成功！`,
            `修改物料 ${newM.name} 失败，已存在相同信息的物料。`
          )

          if (r) {
            dispatch(listMaterials())
            cancel()
          }
        })
      } else {
        let m = mForm.getFieldsValue()

        m.tax = parseInt(m.tax)

        API.addMaterials(m).then(res => {
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

  const changeSupplier = v => {
    let su = suppliers?.find(s => s.id === v)
    mForm.setFieldsValue({ tax: su?.tax })
  }

  return (
    <>
      <Modal
        visible={visible}
        onCancel={cancel}
        onOk={submit}
        title={isEdit ? '编辑物料' : '添加物料'}
        getContainer={false}
        forceRender
        maskClosable={false}
      >
        <Form
          form={mForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ unit: 'pcs' }}
          onKeyUp={handleKeyUp}
          autoComplete="off"
        >
          {!isEdit && copyMaterials ? (
            <Button
              type="primary"
              shape="circle"
              icon={<CopyTwoTone />}
              onClick={() => {
                message.success('粘贴物料信息')

                let cm = { ...copyMaterials }
                cm.supplier = undefined
                cm.tax = 0
                mForm.setFieldsValue(copyMaterials)
                dispatch(clearCopyMaterials())
              }}
            />
          ) : null}
          <Item
            label="物料编码"
            name="code"
            rules={[{ required: true, message: '请输入物料编码' }]}
            getValueFromEvent={v => {
              return v.target.value.trim()
            }}
          >
            <Input className="iii" />
          </Item>
          <Item
            label="物料名称"
            name="name"
            rules={[{ required: true, message: '请输入物料名称' }]}
            getValueFromEvent={v => {
              return v.target.value.trim()
            }}
          >
            <Input className="iii" />
          </Item>
          <Item
            label="物料简称"
            name="short_name"
            getValueFromEvent={v => {
              return v.target.value.trim()
            }}
          >
            <Input className="iii" />
          </Item>

          <Item label="供应商" name={['supplier', 'id']} rules={[{ required: true, message: '请选择供应商' }]}>
            <Select
              showSearch
              filterOption={(input, option) => (option as any).children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              disabled={isEdit}
              onChange={changeSupplier}
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
          <Item
            label="单位"
            name="unit"
            rules={[{ required: true, message: '请输入单位' }]}
            getValueFromEvent={v => {
              return v.target.value.trim()
            }}
          >
            <Input className="iii" />
          </Item>
          <Item label="采购方式" name={'buyType'}>
            <Select>
              <Option value="采购">采购</Option>
              <Option value="外委">外委</Option>
            </Select>
          </Item>
          <Item label="税率" name="tax">
            <InputNumber className="iii" addonAfter="%" />
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default MaterialsModal
