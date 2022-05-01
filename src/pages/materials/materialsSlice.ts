import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from 'api'
import { Materials } from 'api/materials'
import { Supplier } from 'api/supplier'
import { RootState } from 'app/store'

interface SearchOption {
  name?: string
  code?: string
  supplier_id?: number
}
export interface MaterialsState {
  items?: Materials[]
  total?: number
  showModal?: boolean
  allSuppliers?: Supplier[]
  isEdit?: boolean
  editMaterials?: Materials
  currentPage?: number
  searchOption?: SearchOption
}

const initialState: MaterialsState = {
  items: [],
  total: 0,
  showModal: false,
  isEdit: false,
  currentPage: 1
}

export const listAllSuppliers = createAsyncThunk('materials/listAllSuppliers', async () => {
  const res = await API.listSupplier({ all: true })
  return res.data
})

export const listMaterials = createAsyncThunk('materials/listMaterials', async (_, { getState }) => {
  const state = getState() as RootState
  let { currentPage, searchOption } = state.materials
  const res = await API.listMaterials({
    offset: (currentPage! - 1) * 10,
    limit: 10,
    name: searchOption?.name,
    code: searchOption?.code,
    supplier_id: searchOption?.supplier_id
  })
  return res.data
})

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    closeMaterialsModal: state => {
      state.showModal = false
    },
    changeMaterialsPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    updateMaterialsSearchOptions: (state, action: PayloadAction<SearchOption>) => {
      state.searchOption = action.payload
      state.currentPage = 1
    },
    updateMaterialsList: {
      reducer(state, action: PayloadAction<MaterialsState>) {
        state.items = action.payload.items
        state.total = action.payload.total
      },
      prepare(items: Materials[], total: number) {
        return {
          payload: {
            items,
            total
          }
        }
      }
    },
    setEditMaterials: {
      reducer(state, action: PayloadAction<MaterialsState>) {
        const { isEdit, editMaterials } = action.payload
        if (isEdit) {
          state.editMaterials = editMaterials
        }
        state.isEdit = isEdit
        state.showModal = true
      },

      prepare(isEdit: boolean, editMaterials?: Materials) {
        return {
          payload: {
            isEdit,
            editMaterials
          }
        }
      }
    }
  },

  extraReducers: builder => {
    builder.addCase(listAllSuppliers.fulfilled, (state, action) => {
      let { items } = action.payload
      if (items == null) {
        state.allSuppliers = []
      } else {
        items.forEach(it => {
          it.key = it.id
        })
      }
      state.allSuppliers = items
    })
    builder.addCase(listMaterials.fulfilled, (state, action) => {
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
  updateMaterialsSearchOptions,
  closeMaterialsModal,
  updateMaterialsList,
  setEditMaterials,
  changeMaterialsPage
} = materialsSlice.actions
export default materialsSlice.reducer
