import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import WorkplaceStore from './WorkplaceStore';

const WorkplaceStoreContext = createContext(null);

export const WorkplaceStoreProvider = observer(({ children, ...props }) => {
  const store = React.useMemo(() => new WorkplaceStore(props), [props]);
  return (
    <WorkplaceStore.Provider value={store}>
      {children}
    </WorkplaceStore.Provider>
  );
});

export const useWorkplaceStore = () => {
  const store = useContext(WorkplaceStoreContext);
  if (!store) {
    throw new Error('Use store within provider!');
  }
  return store;
};
