import thunk from "redux-thunk";
import { ApplicationState } from "../../src/stores/index";
import configureStore, { MockStore } from "redux-mock-store";

export const generateMockStore = (state: ApplicationState | {}): MockStore<ApplicationState | {}> => {
  const mockStore = configureStore([thunk]);
  const store = mockStore(state) as MockStore<ApplicationState | {}>;

  store.clearActions();
  return store;
};