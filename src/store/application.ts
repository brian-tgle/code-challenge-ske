import { createHook, createStore, StoreActionApi } from 'react-sweet-state'
import { ApplicationStates } from './type.d'

export const APPLICATION_STORE = 'ApplicationStore'

type StoreApi = StoreActionApi<ApplicationStates>;

export const actions = {
  onChangeShowAlert: (showAlertPayload: ApplicationStates) => ({ setState }: StoreApi) => {
    setState(showAlertPayload)
  }
}

export const initialState: ApplicationStates = {
  showAlert: false,
  alertMessage: '',
  alertType: ''
}

type Actions = typeof actions;

export const Store = createStore<ApplicationStates, Actions>({
  initialState,
  actions,
  name: APPLICATION_STORE
})

const useApplicationStore = createHook(Store)

export default useApplicationStore
