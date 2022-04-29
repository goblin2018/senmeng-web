import { Button } from 'antd'
import { useAppDispatch } from 'app/hooks'
import React, { useEffect } from 'react'
import { listAllSuppliers, openMaterialsModal } from './materialsSlice'
import MaterialsModal from './materials_modal'
import MaterialsTable from './materials_table'

const MaterialsPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(listAllSuppliers())
  }, [])
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <Button
          onClick={() => {
            dispatch(openMaterialsModal(true))
          }}
        >
          添加物料
        </Button>
      </div>
      <MaterialsTable />
      <MaterialsModal />
    </div>
  )
}

export default MaterialsPage
