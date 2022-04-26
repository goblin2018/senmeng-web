import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { openMaterialsModal } from 'store/reducers/materials'
import MaterialsModal from './materials_modal'
import MaterialsTable from './materials_table'

const MaterialsPage = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(openMaterialsModal(true))
        }}
      >
        添加物料
      </Button>
      <MaterialsTable />
      <MaterialsModal />
    </div>
  )
}

export default MaterialsPage
