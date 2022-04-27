import { Action } from 'api/action'
import { Materials } from 'api/materials'

export interface RMaterials {
  items?: Materials[]
  total?: number
  showModal?: boolean
}

const initState: RMaterials = {
  items: [],
  total: 0,
  showModal: false
}
const Actions = {
  OpenMaterialsModal: 'OpenMaterialsModal',
  UpdateMaterialsList: 'UpdateMaterialsList'
}

export const openMaterialsModal = (open: boolean): Action<RMaterials> => ({
  type: Actions.OpenMaterialsModal,
  payload: {
    showModal: open
  }
})

export const UpdateMaterialsList = (items: Materials[], total: number): Action<RMaterials> => ({
  type: Actions.UpdateMaterialsList,
  payload: {
    items,
    total
  }
})

const materialsReducer = (state = initState, action: Action<RMaterials>): RMaterials => {
  switch (action.type) {
    case Actions.OpenMaterialsModal:
      return {
        ...state,
        showModal: action.payload?.showModal
      }
    case Actions.UpdateMaterialsList:
      return {
        ...state,
        items: action.payload?.items,
        total: action.payload?.total
      }
    default:
      return state
  }
}

export default materialsReducer
