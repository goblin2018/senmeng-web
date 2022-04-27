import API from 'api'
import { Action } from 'api/action'
import { ListOpt } from 'api/listopt'
import { Supplier } from 'api/supplier'

export interface RSuppliers {
  items?: Supplier[]
  total?: number
  showModal?: boolean
  isEdit?: boolean
  editSupplier?: Supplier
}

const initState: RSuppliers = {
  items: [],
  total: 0,
  showModal: false,
  isEdit: false
}

const Actions = {
  OpenSupplierModal: 'OpenSupplierModal',
  UpdateSupplierList: 'UpdateSupplierList',
  SetEditSupplier: 'SetEditSupplier'
}

export const OpenSupplierModal = (open: boolean): Action<RSuppliers> => ({
  type: Actions.OpenSupplierModal,
  payload: {
    showModal: open
  }
})

export const listSupplier = (opt: ListOpt) => {
  return dispatch => {
    API.listSupplier(opt).then(res => {
      let items = res.data.items
      if (items === null) {
        dispatch(UpdateSupplierList([], res.data.total))
        return
      }
      items.forEach(it => {
        it.key = it.id
      })
      dispatch(UpdateSupplierList(items, res.data.total))
    })
  }
}

export const UpdateSupplierList = (items: Supplier[], total: number): Action<RSuppliers> => ({
  type: Actions.UpdateSupplierList,
  payload: {
    items,
    total
  }
})

export const SetEditSupplier = (isEdit: boolean, editSupplier?: Supplier): Action<RSuppliers> => ({
  type: Actions.SetEditSupplier,
  payload: {
    isEdit,
    editSupplier
  }
})

const suppliersReducer = (state = initState, action: Action<RSuppliers>): RSuppliers => {
  switch (action.type) {
    case Actions.OpenSupplierModal:
      return {
        ...state,
        showModal: action.payload?.showModal
      }
    case Actions.UpdateSupplierList:
      return {
        ...state,
        items: action.payload?.items,
        total: action.payload?.total
      }
    case Actions.SetEditSupplier:
      if (action.payload?.isEdit) {
        return {
          ...state,
          isEdit: true,
          showModal: true,
          editSupplier: action.payload.editSupplier
        }
      }
      return {
        ...state,
        isEdit: false,
        showModal: true
      }
    default:
      return state
  }
}

export default suppliersReducer
