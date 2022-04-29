import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from 'api'
import { Supplier } from 'api/supplier'
import store, { RootState } from 'app/store'

interface SearchOption {
  name?: string
  supplier_id?: string
}
export interface SuppliersState {
  items?: Supplier[]
  total?: number
  showModal?: boolean
  isEdit?: boolean
  editSupplier?: Supplier
  currentPage?: number
  searchOption?: SearchOption
  allSuppliers?: Supplier[]
}

const initialState: SuppliersState = {
  items: [],
  total: 0,
  showModal: false,
  isEdit: false,
  currentPage: 1
}

export const listSupplier = createAsyncThunk('suppliers/listSupplier', async (_, { getState }) => {
  const state = getState() as RootState
  let { currentPage, searchOption } = state.suppliers
  const res = await API.listSupplier({
    offset: (currentPage! - 1) * 10,
    limit: 10,
    name: searchOption?.name,
    supplier_id: searchOption?.supplier_id
  })
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
    },
    updateSupplierSearchOptions: (state, action: PayloadAction<SearchOption>) => {
      state.searchOption = action.payload
      state.currentPage = 1
    }
  },
  extraReducers: builder => {
    builder.addCase(listSupplier.fulfilled, (state, action) => {
      let { items, total } = action.payload
      if (items == null) {
        state.items = []
      } else {
        items.forEach(it => {
          it.key = it.id
        })
      }
      state.items = items
      state.total = total
    })
  }
})
export const {
  openSupplierModal,
  setEditSupplier,
  changeSupplierPage,
  updateSupplierList,
  updateSupplierSearchOptions
} = suppliersSlice.actions
export const supplierModalOpen = (state: RootState) => state.suppliers.showModal
export const supplierPage = (state: RootState) => state.suppliers.currentPage
export default suppliersSlice.reducer
