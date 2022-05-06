import { Pagination, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { Operation } from 'api/operation'
import React, { useEffect, useState } from 'react'
import { toShortDate } from 'utils/time'

const OperationPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState<Operation[]>([])

  const getBusinessInfo = (b: string): string => {
    switch (b) {
      case 'price':
        return '价格'
      case 'materials':
        return '物料'
      case 'supplier':
        return '供应商'
      case 'user':
        return '员工'
      default:
        return ''
    }
  }

  const renderOperation = (op: number) => {
    switch (op) {
      case 2:
        return <Tag color="success">添加</Tag>
      case 3:
        return <Tag color="blue">修改</Tag>
      case 4:
        return <Tag color="#f50">删除</Tag>
      default:
        return <Tag></Tag>
    }
  }

  const columns: ColumnsType<Operation> = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center'
    },
    {
      title: '操作表',
      dataIndex: 'business',
      key: 'business',
      width: 100,
      align: 'center',
      render: text => getBusinessInfo(text)
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      align: 'center',
      render: text => renderOperation(text)
    },
    {
      title: '数据ID',
      dataIndex: ['data', 'id'],
      key: 'id',
      width: 80,
      align: 'center'
    },
    {
      title: '操作后数据',
      dataIndex: 'data',
      key: 'data',
      width: 400,
      render: text => JSON.stringify(text)
    },
    {
      title: '操作前数据',
      dataIndex: 'old_data',
      key: 'old_data',
      width: 400,
      render: text => {
        if (text === null) {
          return ''
        }
        return JSON.stringify(text)
      }
    },

    {
      title: '操作日期',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      align: 'center',
      render: text => toShortDate(text)
    }
  ]

  useEffect(() => {
    // 查询操作记录
    API.listOperation({ offset: (currentPage - 1) * 10, limit: 10 }).then(res => {
      let its = res.data.items
      if (its !== null) {
        its.forEach(it => {
          it.key = it.id
        })
        setItems(its)
      } else {
        setItems([])
      }
      setTotal(res.data.total)
    })
  }, [currentPage])
  return (
    <div className="relative h-full">
      <Table columns={columns} dataSource={items} pagination={false} size="middle" bordered />
      <div className="flex items-center justify-end absolute w-full" style={{ bottom: 0 }}>
        <Pagination current={currentPage} onChange={page => setCurrentPage(page)} total={total} />
      </div>
    </div>
  )
}

export default OperationPage
