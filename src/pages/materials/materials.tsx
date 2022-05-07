import { Button, Pagination } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import MaterialsSearch from './materialsSearch'
import { changeMaterialsPage, listAllSuppliers, listMaterials, setEditMaterials } from './materialsSlice'
import MaterialsModal from './materials_modal'
import MaterialsTable from './materials_table'

const MaterialsPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(listAllSuppliers())
  }, [])

  const total = useAppSelector(state => state.materials.total)
  const currentPage = useAppSelector(state => state.materials.currentPage)
  const changePage = page => {
    dispatch(changeMaterialsPage(page))
    dispatch(listMaterials())
  }
  return (
    <div className="relative h-full">
      <div className="mb-6 flex justify-between">
        <Button
          onClick={() => {
            dispatch(setEditMaterials(false))
          }}
        >
          添加物料
        </Button>
        <MaterialsSearch />
      </div>
      <MaterialsTable />
      <MaterialsModal />
      <div className="flex justify-end absolute w-full h-12 items-center pr-16 bottom-0">
        <Pagination
          total={total}
          current={currentPage}
          onChange={changePage}
          showQuickJumper
          showSizeChanger={false}
          showTotal={total => `共 ${total} 项`}
        />
      </div>
    </div>
  )
}

export default MaterialsPage
