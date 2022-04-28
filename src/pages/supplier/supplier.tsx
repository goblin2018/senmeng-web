import { Button, Pagination } from 'antd'
import React from 'react'
import SupplierModal from './supplier_modal'
import SupplierTable from './supplier_table'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { changeSupplierPage, listSupplier, setEditSupplier } from './suppliersSlice'

const SupplierPage = () => {
  const dispatch = useAppDispatch()
  const total = useAppSelector(state => state.suppliers.total)
  const currentPage = useAppSelector(state => state.suppliers.currentPage)

  const changePage = page => {
    console.log('new page', page)
    dispatch(changeSupplierPage(page))
    dispatch(listSupplier())
  }
  return (
    <div className="relative h-full">
      <div className="mb-6">
        <Button
          onClick={() => {
            dispatch(setEditSupplier(false))
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
