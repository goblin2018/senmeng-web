import { Button, notification, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { Price, PriceStatus } from 'api/price'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import moment from 'moment'
import React from 'react'
import { toShortDate } from 'utils/time'
import { setEditPrice, updatePriceItems } from './priceSlice'

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
      width: 100,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: v =>
        v == PriceStatus.NotAudit ? <Tag color={'processing'}>待审核</Tag> : <Tag color={'success'}>正常</Tag>
    },
    {
      title: '更新日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      align: 'center',
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

  const delPrice = (p: Price) => {
    API.delPrice(p).then(res => {
      notification.success({
        message: '操作成功',
        description: `${moment(p.date).format('YYYY-MM-DD')} 价格删除成功！`
      })
      let index = 0
      for (let i = 0; i < items!.length; i++) {
        if (p.id === items![i].id) {
          index = i
          break
        }
      }
      let n = [...items!]
      n.splice(index, 1)
      dispatch(updatePriceItems(n))
    })
  }
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.price.items)

  return (
    <div style={{ width: 450 }}>
      <Table columns={columns} size="middle" dataSource={items} bordered />
    </div>
  )
}

export default PriceTable
