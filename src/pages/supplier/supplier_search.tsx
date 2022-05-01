import React from 'react'
import { Button, Form, Input } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { listSupplier, updateSupplierSearchOptions } from './suppliersSlice'

const { Item } = Form
const SupplierSearch = () => {
  const dispatch = useAppDispatch()
  const [sForm] = Form.useForm()
  const searchOption = useAppSelector(state => state.suppliers.searchOption)
  const submit = () => {
    let optins = sForm.getFieldsValue()
    if (searchOption?.name === optins.name && searchOption?.code === optins.code) {
      return
    }
    dispatch(updateSupplierSearchOptions(optins))
    dispatch(listSupplier())
  }

  const clearSearch = () => {
    sForm.resetFields()
    dispatch(updateSupplierSearchOptions({}))
    dispatch(listSupplier())
  }
  return (
    <>
      <Form layout="inline" form={sForm} onFinish={submit}>
        <Item label="供应商编号" name={'code'}>
          <Input allowClear />
        </Item>
        <Item label="供应商名称" name={'name'}>
          <Input allowClear />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Item>
        <Item>
          <Button type="text" onClick={clearSearch}>
            清空
          </Button>
        </Item>
      </Form>
    </>
  )
}

export default SupplierSearch
