import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from 'api'
import { Action } from 'api/action'
import { ListOpt } from 'api/listopt'
import { Supplier } from 'api/supplier'
import { RootState } from 'app/store'
import store from '../../store/store'
export interface RSuppliers {
  items?: Supplier[]
  total?: number
  showModal?: boolean
  isEdit?: boolean
  editSupplier?: Supplier
  currentPage?: number
}

const Actions = {
  OpenSupplierModal: 'OpenSupplierModal',
  UpdateSupplierList: 'UpdateSupplierList',
  SetEditSupplier: 'SetEditSupplier',
  ChangeSupplierPage: 'ChangeSupplierPage'
}

export const ListSupplier = () => {
  const a = (items: Supplier[], total: number): Action<RSuppliers> => ({
    type: Actions.UpdateSupplierList,
    payload: {
      items,
      total
    }
  })

  return dispatch => {
    let page = store.getState().suppliers.currentPage!
    API.listSupplier({ offset: (page - 1) * 10, limit: 10 }).then(res => {
      let items = res.data.items
      if (items === null) {
        dispatch(a([], res.data.total))
        return
      }
      items.forEach(it => {
        it.key = it.id
      })
      dispatch(a(items, res.data.total))
    })
  }
}

const initialState: RSuppliers = {
  items: [],
  total: 0,
  showModal: false,
  isEdit: false,
  currentPage: 1
}
const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    openSupplierModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
    },
    editSupplier: (state, action: PayloadAction<RSuppliers>) => {
      const { isEdit, editSupplier } = action.payload
      if (isEdit) {
        state.isEdit = true
        state.editSupplier = editSupplier
      }
      state.showModal = true
    },
    changeSupplierPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    updateSupplierList: (state, action: PayloadAction<RSuppliers>) => {
      const { items, total } = action.payload
      state.items = items
      state.total = total
    }
  }
})

export const { openSupplierModal, editSupplier, changeSupplierPage, updateSupplierList } = suppliersSlice.actions
export const supplierModalOpen = (state: RootState) => state.suppliers.showModal
export default suppliersSlice.reducer
