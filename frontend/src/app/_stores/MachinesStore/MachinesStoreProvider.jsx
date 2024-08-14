import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { MachinesStore } from './MachinesStore';

const MachinesStoreContext = createContext(null);

export const MachinesStoreProvider = observer(({ children, ...props }) => {
  const store = React.useMemo(() => new MachinesStore(props), [props]);
  return (
    <MachinesStoreContext.Provider value={store}>
      {children}
    </MachinesStoreContext.Provider>
  );
});

export const useMachinesStore = () => {
  const store = useContext(MachinesStoreContext);
  if (!store) {
    throw new Error('Use store within provider!');
  }
  return store;
};
