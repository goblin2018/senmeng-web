import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SetEditSupplier } from 'store/suppliers'
import SupplierModal from './supplier_modal'
import SupplierTable from './supplier_table'

const SupplierPage = () => {
  const dispatch = useDispatch()
  return (
    <>
      <Button
        onClick={() => {
          dispatch(SetEditSupplier(false))
        }}
      >
        添加供应商
      </Button>
      <SupplierModal />
      <SupplierTable />
    </>
  )
}

export default SupplierPage
