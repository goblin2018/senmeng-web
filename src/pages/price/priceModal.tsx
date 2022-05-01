import { DatePicker, Form, Input, InputNumber, Modal } from 'antd'
import API from 'api'
import { Price } from 'api/price'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { notifyCode } from 'utils/errcode'
import { closePriceModal, listPrice } from './priceSlice'
import moment from 'moment'
import { RootState } from 'app/store'
const PriceModal = () => {
  const visible = useAppSelector(state => state.price.showModal)
  const isEdit = useAppSelector(state => state.price.isEdit)
  const currentMaterials = useAppSelector(state => state.price.currentMaterials)
  const editPrice = useAppSelector(state => state.price.editPrice)
  const dispatch = useAppDispatch()
  const cancel = () => {
    dispatch(closePriceModal())
  }

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        console.log('set values ', editPrice)
        pForm.setFieldsValue({
          price: editPrice?.price,
          date: moment(editPrice?.date)
        })
      }
    } else {
      pForm.resetFields()
    }
  }, [visible, isEdit])

  const formToPrice = (): Price => {
    let p = pForm.getFieldsValue() as Price
    let d = pForm.getFieldValue('date').toDate() as Date
    d.setHours(0)
    d.setMilliseconds(0)
    d.setSeconds(0)
    p.date = d
    p.material_id = currentMaterials!.id
    p.price = Math.floor(p.price * 100) / 100

    return p
  }

  const submit = () =>
    pForm.validateFields().then(() => {
      if (isEdit) {
        // 编辑

        let p = formToPrice()
        if (p.date === editPrice) {
        }
      } else {
        // 添加
        API.addPrice(formToPrice()).then(res => {
          let r = notifyCode(res.data.code, '添加价格成功！', '添加价格失败,已存在该价格。')
          if (r) {
            dispatch(listPrice())
            cancel()
          }
        })
      }
    })

  const [pForm] = Form.useForm()
  return (
    <>
      <Modal forceRender onOk={submit} onCancel={cancel} visible={visible} title={isEdit ? '编辑价格' : '添加价格'}>
        <Form form={pForm} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} autoComplete="off">
          <Form.Item label="价格" name={'price'} rules={[{ required: true, message: '请输入价格' }]}>
            <InputNumber className="iii" style={{ width: 150 }} />
          </Form.Item>
          <Form.Item label="日期" name={'date'} rules={[{ required: true, message: '请选择日期' }]}>
            <DatePicker className="iii" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default PriceModal
