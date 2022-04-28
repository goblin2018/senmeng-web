import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from 'api'
import { Supplier } from 'api/supplier'
import store, { RootState } from 'app/store'
export interface SuppliersState {
  items?: Supplier[]
  total?: number
  showModal?: boolean
  isEdit?: boolean
  editSupplier?: Supplier
  currentPage?: number
}

const initialState: SuppliersState = {
  items: [],
  total: 0,
  showModal: false,
  isEdit: false,
  currentPage: 1
}

export const listSupplier = createAsyncThunk('suppliers/listSupplier', async () => {
  let page = store.getState().suppliers.currentPage!
  const res = await API.listSupplier({ offset: (page - 1) * 10, limit: 10 })
  return res.data
})

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    openSupplierModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
    },
    setEditSupplier: {
      reducer(state, action: PayloadAction<SuppliersState>) {
        const { isEdit, editSupplier } = action.payload
        if (isEdit) {
          state.isEdit = true
          state.editSupplier = editSupplier
        }
        state.showModal = true
      },
      prepare(isEdit: boolean, editSupplier?: Supplier) {
        return {
          payload: {
            isEdit,
            editSupplier
          }
        }
      }
    },
    changeSupplierPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    updateSupplierList: (state, action: PayloadAction<SuppliersState>) => {
      const { items, total } = action.payload
      state.items = items
      state.total = total
    }
  },
  extraReducers: builder => {
    builder.addCase(listSupplier.fulfilled, (state, action) => {
      let { items, total } = action.payload
      if (items == null) {
        state.items = []
      }
      items.forEach(it => {
        it.key = it.id
      })
      state.total = total
    })
  }
})

export const { openSupplierModal, setEditSupplier, changeSupplierPage, updateSupplierList } = suppliersSlice.actions
export const supplierModalOpen = (state: RootState) => state.suppliers.showModal
export default suppliersSlice.reducer
