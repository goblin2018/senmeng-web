import { DatePicker, Form, Input, InputNumber, Modal, notification } from 'antd'
import API from 'api'
import { Price } from 'api/price'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect, useState } from 'react'
import { notifyCode } from 'utils/errcode'
import { closePriceModal, listPrice } from './priceSlice'
import moment from 'moment'
const PriceModal = () => {
  const visible = useAppSelector(state => state.price.showModal)
  const isEdit = useAppSelector(state => state.price.isEdit)
  const currentMaterials = useAppSelector(state => state.price.currentMaterials)
  const currentMoqID = useAppSelector(s => s.price.currentMoqID)
  const editPrice = useAppSelector(state => state.price.editPrice)
  const dispatch = useAppDispatch()

  const items = useAppSelector(state => state.price.items)
  const cancel = () => {
    dispatch(closePriceModal())
  }

  useEffect(() => {
    if (visible) {
      if (isEdit) {
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
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    p.date = d
    p.moq_id = currentMoqID!
    p.price = Math.floor(p.price * 100) / 100

    return p
  }

  const submit = () =>
    pForm.validateFields().then(() => {
      if (isEdit) {
        // 编辑
        let p = formToPrice()
        if (p.date === editPrice?.date && p.price === editPrice.price) {
          notification.info({
            message: '通知',
            description: '未修改价格信息。'
          })
          cancel()
          return
        }

        p.id = editPrice!.id
        API.updatePrice(p).then(res => {
          let r = notifyCode(
            res.data.code,
            '修改价格成功！',
            `修改价格失败,已存在 ${moment(p.date).format('YYYY-MM-DD')} 的价格。`
          )
          if (r) {
            dispatch(listPrice({}))
            cancel()
          }
        })
      } else {
        // 添加
        API.addPrice(formToPrice()).then(res => {
          let r = notifyCode(res.data.code, '添加价格成功！', '添加价格失败,已存在该价格。')
          if (r) {
            dispatch(listPrice({}))
            cancel()
          }
        })
      }
    })

  const [pForm] = Form.useForm()
  return (
    <>
      <Modal
        forceRender
        onOk={submit}
        onCancel={cancel}
        visible={visible}
        title={isEdit ? '编辑价格' : '添加价格'}
        maskClosable={false}
      >
        <Form form={pForm} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} autoComplete="off">
          <Form.Item label="日期" name={'date'} rules={[{ required: true, message: '请选择日期' }]}>
            <DatePicker className="iii" autoFocus />
          </Form.Item>

          <Form.Item label="价格" name={'price'} rules={[{ required: true, message: '请输入价格' }]}>
            <InputNumber
              className="iii"
              style={{ width: 150 }}
              onKeyUp={e => {
                if (e.keyCode != 13) {
                  return
                }
                submit()
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default PriceModal
