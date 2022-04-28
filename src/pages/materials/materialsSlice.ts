import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Materials } from 'api/materials'

export interface MaterialsState {
  items?: Materials[]
  total?: number
  showModal?: boolean
}

const initialState: MaterialsState = {
  items: [],
  total: 0,
  showModal: false
}

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    openMaterialsModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
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
    }
  }
})

export const { openMaterialsModal, updateMaterialsList } = materialsSlice.actions

export default materialsSlice.reducer
