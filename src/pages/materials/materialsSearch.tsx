import { Button, Form, Input, Select } from 'antd'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { listMaterials, updateMaterialsSearchOptions } from './materialsSlice'

const { Item } = Form
const { Option } = Select
const MaterialsSearch = () => {
  const dispatch = useAppDispatch()
  const suppliers = useAppSelector(state => state.materials.allSuppliers)
  const clearSearch = () => {
    sForm.resetFields()
    dispatch(updateMaterialsSearchOptions({}))
  }

  const [sForm] = Form.useForm()
  const searchOption = useAppSelector(state => state.materials.searchOption)
  const submit = () => {
    let options = sForm.getFieldsValue()
    if (
      searchOption?.name == options.name &&
      searchOption?.code === options.code &&
      searchOption?.supplier_id === options.supplier_id
    ) {
      return
    }
    dispatch(updateMaterialsSearchOptions(options))
  }

  useEffect(() => {
    dispatch(listMaterials())
  }, [searchOption])

  return (
    <>
      <Form layout="inline" form={sForm} onFinish={submit}>
        <Item label="物料编码" name="code">
          <Input allowClear />
        </Item>
        <Item label="物料名称" name="name">
          <Input allowClear />
        </Item>
        <Item label="供应商" name="supplier_id">
          <Select
            filterOption={(input, option) => (option as any).children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            allowClear
            showSearch
            showArrow={false}
            style={{ width: 200 }}
          >
            {suppliers?.map(s => (
              <Option value={s.id} key={s.id}>
                {s.name}
              </Option>
            ))}
          </Select>
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

export default MaterialsSearch
