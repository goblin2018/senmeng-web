import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from 'api'
import { Moq } from 'api/moq'
import { RootState } from 'app/store'

interface MoqState {
  items?: Moq[]
  showModal?: boolean
  editMoq?: Moq
}

const initState: MoqState = {
  items: [],
  showModal: false
}
export const listMoq = createAsyncThunk(
  'moq/listMoq',

  async (_, { getState }) => {
    const state = getState() as RootState
    let res = await API.listMoq(state.price.currentMaterials!.id)
    return res.data.data
  }
)

const moqSlice = createSlice({
  name: 'moq',
  initialState: initState,
  reducers: {
    openMoqModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
    },
    clearMoq: state => {
      console.log('cear moq')

      state.items = []
    }
  },
  extraReducers: builders => {
    builders.addCase(listMoq.fulfilled, (state, action) => {
      let { items, total } = action.payload
      if (items) {
        items.map(it => {
          it.key = it.id
        })
        state.items = items
      } else {
        state.items = []
      }
    })
  }
})
export const { openMoqModal, clearMoq } = moqSlice.actions
export default moqSlice.reducer
