import { Button, Form, Input, InputNumber, Modal, notification, Popconfirm, Table } from 'antd'
import API from 'api'
import { Moq } from 'api/moq'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'
import { notifyCode } from 'utils/errcode'
import { listMoq, openMoqModal } from './moqSlice'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Moq
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const MoqModal = () => {
  const visible = useAppSelector(s => s.moq.showModal)
  const items = useAppSelector(s => s.moq.items)
  const [showAdd, setShowAdd] = useState(false)
  const dispatch = useAppDispatch()
  const cancel = () => {
    dispatch(openMoqModal(false))
  }

  const [editingMoq, setEditingMoq] = useState<Moq>({ id: 0, moq: 0 })
  const isEditing = (record: Moq) => record.id === editingMoq.id

  const submitEdit = () => {
    let m = { ...editingMoq, ...editForm.getFieldsValue() } as Moq

    if (m.moq === editingMoq.moq && m.desc == editingMoq.desc) {
      notification.info({
        message: '通知',
        description: '未修改MOQ。'
      })
      cancelEditMoq()
      return
    }
    API.updateMoq(m).then(res => {
      let r = notifyCode(res.data.code, '修改MOQ成功', '修改MOQ失败，存在相同的数据。')
      if (r) {
        dispatch(listMoq())
        cancelEditMoq()
      }
    })
  }

  const cancelEditMoq = () => {
    setEditingMoq({ id: 0, moq: 0 })
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: 'MOQ',
      dataIndex: 'moq',
      key: 'moq',
      width: 140,
      align: 'center',
      editable: true
    },
    {
      title: '备注',
      dataIndex: 'desc',
      key: 'desc',
      width: 260,
      editable: true
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        const editable = isEditing(record)
        if (editable) {
          return (
            <div className="flex">
              <Button type="primary" className="mr-2" onClick={submitEdit}>
                确认
              </Button>
              <Button type="text" onClick={cancelEditMoq}>
                取消
              </Button>
            </div>
          )
        } else {
          return (
            <div className="flex ">
              <Button
                type="text"
                className="mr-2"
                onClick={() => {
                  editForm.setFieldsValue({ ...record })
                  setEditingMoq(record)
                }}
              >
                编辑
              </Button>

              <Popconfirm
                title="确定删除MOQ？"
                onConfirm={() => {
                  API.delMoq(record).then(res => {
                    notification.success({
                      message: '操作成功',
                      description: '删除MOQ成功'
                    })
                    cancelEditMoq()
                    dispatch(listMoq())
                  })
                }}
              >
                <Button danger type="text">
                  删除
                </Button>
              </Popconfirm>
            </div>
          )
        }
      }
    }
  ]

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record: Moq) => ({
        record,
        inputType: col.dataIndex === 'moq' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  const [editForm] = Form.useForm()
  const [addForm] = Form.useForm()
  const currentMaterials = useAppSelector(state => state.price.currentMaterials)

  const submit = () =>
    addForm.validateFields().then(() => {
      let m = addForm.getFieldsValue() as Moq
      m.materialsId = currentMaterials?.id
      API.addMoq(m).then(res => {
        console.log(res)
        let r = notifyCode(res.data.code, '添加MOQ成功', '添加MOQ失败，存在相同的数据。')
        if (r) {
          dispatch(listMoq())
          setShowAdd(false)
        }
      })
    })

  return (
    <Modal visible={visible} onCancel={cancel} onOk={cancel} title="编辑MOQ" maskClosable={false} width={800}>
      <div className="flex h-14">
        <Button className="mb-4 mr-4 " onClick={() => setShowAdd(!showAdd)}>
          添加MOQ
        </Button>
        <Form
          className={`${showAdd ? 'h-14' : 'h-0'} transition-all overflow-hidden`}
          layout="inline"
          onFinish={submit}
          form={addForm}
        >
          <Form.Item
            name={'moq'}
            label="MOQ"
            rules={[
              {
                required: true,
                message: '请输入 MOQ!'
              }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={'desc'} label="备注">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Form form={editForm} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          columns={mergedColumns as any}
          dataSource={items}
        />
      </Form>
    </Modal>
  )
}

export default MoqModal
