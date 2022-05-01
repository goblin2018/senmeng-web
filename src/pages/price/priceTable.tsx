import { Button, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Price } from 'api/price'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { toShortDate } from 'utils/time'
import { listPrice, setEditPrice } from './priceSlice'

const PriceTable = () => {
  const columns: ColumnsType<Price> = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'center'
    },
    {
      title: '更新日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: text => toShortDate(text)
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <div className="flex ">
            <Button type="link" onClick={() => setEdit(record)}>
              编辑
            </Button>
            <Popconfirm title="确定删除物料？" onConfirm={() => delPrice(record)}>
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  const setEdit = (p: Price) => {
    dispatch(setEditPrice(true, p))
  }

  const delPrice = (p: Price) => {}
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.price.items)

  useEffect(() => {
    dispatch(listPrice())
  }, [])

  return (
    <div style={{ width: 600 }}>
      <Table columns={columns} size="middle" dataSource={items} bordered />
    </div>
  )
}

export default PriceTable
