import { Button, Pagination } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'store'
import { ChangeSupplierPage, ListSupplier, SetEditSupplier } from 'pages/supplier/suppliers'
import SupplierModal from './supplier_modal'
import SupplierTable from './supplier_table'

const SupplierPage = () => {
  const dispatch = useDispatch()
  const total = useSelector((state: State) => state.suppliers.total)
  const currentPage = useSelector((state: State) => state.suppliers.currentPage)

  const changePage = page => {
    console.log('new page', page)
    dispatch(ChangeSupplierPage(page))
    dispatch(ListSupplier())
  }
  return (
    <div className="relative h-full">
      <div className="mb-6">
        <Button
          onClick={() => {
            dispatch(SetEditSupplier(false))
          }}
        >
          添加供应商
        </Button>
      </div>
      <SupplierModal />
      <SupplierTable />
      <div className="flex justify-end absolute w-full h-12 items-center pr-16 bottom-0">
        <Pagination total={total} current={currentPage} onChange={changePage} />
      </div>
    </div>
  )
}

export default SupplierPage
