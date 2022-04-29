import { Button, notification, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { Materials } from 'api/materials'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { listMaterials } from './materialsSlice'

const MaterialsTable = () => {
  const columns: ColumnsType<Materials> = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center'
    },
    {
      title: '物料编码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      align: 'center'
    },
    {
      title: '供应商',
      dataIndex: ['supplier', 'id'],
      key: 'supplier_id',
      width: 100,
      align: 'center'
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <div className="flex ">
            <Button type="link">编辑</Button>
            <Popconfirm title="确定删除物料？" onConfirm={() => delMaterials(record)}>
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  const items = useAppSelector(state => state.materials.items)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(listMaterials())
  }, [])

  const delMaterials = (mt: Materials) => {
    API.delMaterials(mt).then(res => {
      notification.success({
        message: '删除物料成功'
      })
    })
  }
  return (
    <>
      <Table columns={columns} bordered dataSource={items} />
    </>
  )
}

export default MaterialsTable
