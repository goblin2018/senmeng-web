import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, notification } from 'antd'
import API from 'api'
import { Supplier } from 'api/supplier'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { notifyCode } from 'utils/errcode'
import { listSupplier, openSupplierModal } from './suppliersSlice'

const { Item } = Form
const SupplierModal = () => {
  const dispatch = useAppDispatch()
  const visible = useAppSelector(state => state.suppliers.showModal)
  const isEdit = useAppSelector(state => state.suppliers.isEdit)
  const editSupplier = useAppSelector(state => state.suppliers.editSupplier)
  const [sForm] = Form.useForm()
  const [inputs, setInputs] = useState<HTMLInputElement[]>([])
  const cancel = () => {
    dispatch(openSupplierModal(false))
  }

  useEffect(() => {
    // 打开
    if (visible) {
      let tmpIs: HTMLInputElement[] = []
      const is = document.getElementsByClassName('iii')
      for (let i = 0; i < is.length; i++) {
        tmpIs.push(is[i] as HTMLInputElement)
      }
      setInputs(tmpIs)
      console.log('focus ', tmpIs[0])
      setTimeout(() => {
        tmpIs[0].focus()
      })
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
            dispatch(listSupplier())
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
            dispatch(listSupplier())
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
      <Modal visible={visible} title={isEdit ? '编辑供应商' : '添加供应商'} onCancel={cancel} onOk={submit} forceRender>
        <Form form={sForm} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} autoComplete="off" onKeyUp={handleKeyUp}>
          <Item label="供应商编码" name="supplier_id" rules={[{ required: true, message: '请输入供应商编码' }]}>
            <Input className="iii" />
          </Item>
          <Item label="供应商名称" name="name" rules={[{ required: true, message: '请输入供应商名称' }]}>
            <Input className="iii" />
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default SupplierModal
