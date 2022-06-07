import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from 'api'
import { Materials } from 'api/materials'
import { Moq } from 'api/moq'
import { Price } from 'api/price'
import { RootState } from 'app/store'

interface PriceState {
  items?: Price[]
  total?: number
  showModal?: boolean
  isEdit?: boolean
  editPrice?: Price
  currentPage?: number
  currentMaterials?: Materials
  currentMoqID?: number
}

const initialState: PriceState = {
  items: [],
  total: 0,
  showModal: false,
  isEdit: false,
  currentPage: 1,
  currentMoqID: undefined
}

export const listPrice = createAsyncThunk(
  'price/listPrice',

  async (_, { getState }) => {
    const state = getState() as RootState
    let res = await API.listPrice({
      moq_id: state.price.currentMoqID
    })

    return res.data
  }
)

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    closePriceModal: state => {
      state.showModal = false
    },
    clearPriceList: state => {
      state.items = []
    },
    setEditPrice: {
      reducer(state, action: PayloadAction<PriceState>) {
        const { isEdit, editPrice } = action.payload
        if (isEdit) {
          state.editPrice = editPrice
        }
        state.isEdit = isEdit
        state.showModal = true
      },
      prepare(isEdit: boolean, editPrice?: Price) {
        return {
          payload: {
            isEdit,
            editPrice
          }
        }
      }
    },
    setCurrentMaterials: (state, action: PayloadAction<Materials>) => {
      state.currentMaterials = action.payload
    },
    setCurrentMoqID: (state, action: PayloadAction<number | undefined>) => {
      state.currentMoqID = action.payload
    },
    changePricePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    updatePriceItems: (state, action: PayloadAction<Price[]>) => {
      state.items = action.payload
    }
  },
  extraReducers: builders => {
    builders.addCase(listPrice.fulfilled, (state, action) => {
      let { items, total } = action.payload
      console.log('price items ', items)

      if (items == null) {
        state.items = []
      } else {
        items.forEach(it => {
          it.key = it.id
          // 处理价格问题
          it.price = it.price / 100
        })
        state.items = items
      }

      state.total = total
    })
  }
})

export const {
  updatePriceItems,
  setCurrentMaterials,
  changePricePage,
  setEditPrice,
  closePriceModal,
  setCurrentMoqID,
  clearPriceList
} = priceSlice.actions
export default priceSlice.reducer
