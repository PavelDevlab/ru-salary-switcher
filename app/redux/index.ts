
import { createStore, Store } from 'redux';
import createRootReducer, {StoreState} from './reducer';

function createAppStore(initialState: Partial<StoreState> = {}): Store<StoreState> {
  const rootReducer = createRootReducer();
  return createStore(
      rootReducer,
      initialState
  );
}

export default createAppStore;