import { Button, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { ListOpt } from 'api/listopt'
import { Supplier } from 'api/supplier'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'store'
import { SetEditSupplier, UpdateSupplierList } from 'store/suppliers'

const SupplierTable = () => {
  const items = useSelector((state: State) => state.suppliers.items)
  const isEdit = useSelector((state: State) => state.suppliers.isEdit)
  const dispatch = useDispatch()
  useEffect(() => {
    listSupplier({ offset: 0, limit: 10 })
  }, [])
  const listSupplier = (opt: ListOpt) => {
    API.listSupplier(opt).then(res => {
      let items = res.data.items
      items.forEach(it => {
        it.key = it.id
      })
      dispatch(UpdateSupplierList(res.data.items, res.data.total))
    })
  }
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
            <Popconfirm title="确定删除供应商？" onConfirm={() => delSupplier(record)}>
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
    dispatch(SetEditSupplier(true, s))
  }

  const delSupplier = (s: Supplier) => {
    API.delSupplier(s).then(res => {
      // 更新列表
      listSupplier({ offset: 0, limit: 10 })
    })
  }

  return (
    <>
      <Table columns={columns} dataSource={items} bordered />
    </>
  )
}

export default SupplierTable
