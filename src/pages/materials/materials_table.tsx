import { CopyFilled, CopyOutlined, CopyTwoTone } from '@ant-design/icons'
import { Button, message, notification, Popconfirm, Table, Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { Materials } from 'api/materials'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setCurrentMaterials } from 'pages/price/priceSlice'
import { changeSupplierPage } from 'pages/supplier/suppliersSlice'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { copyMaterials, listMaterials, setEditMaterials } from './materialsSlice'

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
      title: '物料编码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      align: 'center'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: {
        showTitle: false
      },

      render: text => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },

    {
      title: '物料参数',
      dataIndex: 'desc',
      key: 'desc',
      width: 450,
      ellipsis: {
        showTitle: false
      },

      render: text => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: '供应商',
      dataIndex: ['supplier', 'name'],
      key: 'supplier_id',
      ellipsis: {
        showTitle: false
      },
      width: 250,
      render: text => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: '税率',
      dataIndex: 'tax',
      key: 'tax',
      width: 80,
      render: text => text + '%'
    },
    {
      title: '采购方式',
      dataIndex: 'buyType',
      key: 'buyType',
      width: 80,
      align: 'center'
    },
    // {
    //   title: '更新日期',
    //   dataIndex: 'price_date',
    //   key: 'price_date',
    //   width: 120,
    //   align: 'center',
    //   render: (text, record) => {
    //     let its = record.price_list
    //     if (its) {
    //       return moment(its[0].date).format('YYYY-MM-DD')
    //     }
    //     return ''
    //   }
    // },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <div className="flex ">
            <Button type="primary" onClick={() => addPrice(record)}>
              价格
            </Button>
            <Button type="link" onClick={() => setEdit(record)}>
              编辑
            </Button>
            <Popconfirm title="确定删除物料？" onConfirm={() => delMaterials(record)}>
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>

            <Button
              shape="circle"
              icon={<CopyTwoTone />}
              onClick={() => {
                message.success('复制物料信息成功')
                dispatch(copyMaterials(record))
              }}
            />
          </div>
        )
      }
    }
  ]
  const setEdit = (it: Materials) => {
    dispatch(setEditMaterials(true, it))
  }
  const navigate = useNavigate()
  const addPrice = (it: Materials) => {
    // 设置当前物料
    dispatch(setCurrentMaterials(it))
    navigate('/price?material_id=' + it.id, { state: it })
  }
  const items = useAppSelector(state => state.materials.items)
  const currentPage = useAppSelector(state => state.materials.currentPage)
  const dispatch = useAppDispatch()

  const delMaterials = (mt: Materials) => {
    API.delMaterials(mt).then(res => {
      notification.success({
        message: '删除物料成功'
      })
    })

    if (items?.length === 1 && currentPage! > 1) {
      dispatch(changeSupplierPage(currentPage! - 1))
    }
    dispatch(listMaterials())
  }
  return (
    <>
      <Table columns={columns} bordered dataSource={items} size="middle" pagination={false} />
    </>
  )
}

export default MaterialsTable
