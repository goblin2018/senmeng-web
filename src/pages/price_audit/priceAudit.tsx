import { Button, Card, notification, Pagination, Popconfirm, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { Price, PriceStatus } from 'api/price'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import moment from 'moment'
import PriceModal from 'pages/price/priceModal'
import { changePricePage, listPrice, setEditPrice, updatePriceItems } from 'pages/price/priceSlice'
import { useEffect, useState } from 'react'
import { toShortDate } from 'utils/time'

const PriceAuditPage = () => {
  const dispatch = useAppDispatch()
  const { items, total, currentPage } = useAppSelector(s => s.price)
  const [currentMoq, setCurrentMoq] = useState(0)
  useEffect(() => {
    if (!currentPage) {
      return
    }
    dispatch(listPrice({ status: PriceStatus.NotAudit, offset: (currentPage - 1) * 10, limit: 10 }))
  }, [currentPage])

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
      title: '物料名称',
      dataIndex: ['moq', 'materials', 'name'],
      key: 'materialsName',
      width: 300
    },
    {
      title: '厂家',
      dataIndex: ['moq', 'materials', 'supplier', 'abbr'],
      key: 'price',
      width: 160,
      align: 'center'
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      align: 'center'
    },
    {
      title: '申请人',
      dataIndex: ['editor', 'name'],
      key: 'editorName',
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
            <Popconfirm title="确认价格？" onConfirm={() => auditPrice(record)}>
              <Button type="primary">确认</Button>
            </Popconfirm>

            <Button
              type="link"
              onClick={() => {
                setCurrentMoq(record.moq!.moq)
                setEdit(record)
              }}
            >
              编辑
            </Button>
            <Popconfirm title="确定删除价格？" onConfirm={() => delPrice(record)}>
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  const auditPrice = (p: Price) => {
    API.auditPrice(p).then(res => {
      notification.success({
        message: '操作成功',
        description: `${moment(p.date).format('YYYY-MM-DD')} 价格确认成功！`
      })

      dispatch(listPrice({ status: PriceStatus.NotAudit, offset: (currentPage! - 1) * 10, limit: 10 }))
    })
  }

  const setEdit = (p: Price) => {
    dispatch(setEditPrice(true, p))
  }

  const delPrice = (p: Price) => {
    API.delPrice(p).then(res => {
      notification.success({
        message: '操作成功',
        description: `${moment(p.date).format('YYYY-MM-DD')} 价格删除成功！`
      })
      dispatch(listPrice({ status: PriceStatus.NotAudit, offset: (currentPage! - 1) * 10, limit: 10 }))
    })
  }

  return (
    <div className="relative h-full">
      <PriceModal
        moq={currentMoq}
        listPrice={() => {
          dispatch(listPrice({ status: PriceStatus.NotAudit, offset: (currentPage! - 1) * 10, limit: 10 }))
        }}
      />
      <Table columns={columns} size="middle" dataSource={items} bordered pagination={false} />

      <div className="flex justify-end absolute w-full h-12 items-center pr-16 bottom-0">
        <Pagination
          total={total}
          current={currentPage}
          onChange={v => dispatch(changePricePage(v))}
          showTotal={total => `共 ${total} 项`}
        />
      </div>
    </div>
  )
}

export default PriceAuditPage
