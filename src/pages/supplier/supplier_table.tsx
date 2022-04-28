import { Button, notification, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { ListOpt } from 'api/listopt'
import { Supplier } from 'api/supplier'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { listSupplier, setEditSupplier } from './suppliersSlice'

const SupplierTable = () => {
  const items = useAppSelector(state => state.suppliers.items)
  const isEdit = useAppSelector(state => state.suppliers.isEdit)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(listSupplier())
  }, [])

  const columns: ColumnsType<Supplier> = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: '供应商编号',
      dataIndex: 'supplier_id',
      key: 'supplier_id',
      width: 120,
      align: 'center'
    },
    {
      title: '供应商名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align: 'center'
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <div className="flex ">
            <Button type="link" onClick={() => editSupplier(record)}>
              编辑
            </Button>
            <Popconfirm title={`确定删除供应商 ${record.name} ？`} onConfirm={() => delSupplier(record)}>
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  const editSupplier = (s: Supplier) => {
    dispatch(setEditSupplier(true, s))
  }

  const delSupplier = (s: Supplier) => {
    API.delSupplier(s).then(res => {
      notification.success({
        message: '操作成功',
        description: `删除供应商 ${s.name} 成功。`
      })
      // 更新列表
      dispatch(listSupplier())
    })
  }

  return (
    <>
      <Table columns={columns} dataSource={items} bordered size="middle" pagination={false} />
    </>
  )
}

export default SupplierTable
