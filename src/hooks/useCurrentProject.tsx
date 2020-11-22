import React, { createContext, useContext, useReducer } from 'react';

const initialState = {};

const CurrentProjectContext = createContext(initialState);
const { Provider } = CurrentProjectContext;

export const useCurrentProject = (): any => useContext(CurrentProjectContext);

export enum CurrentProjectAction {
  SET_CURRENT_PROJECT
}

export const CurrentProjectProvider: React.FC = ({ children }) => {
  const [currentProjectState, currentProjectDispatch] = useReducer((_state, action) => {
    switch (action.type) {
      case CurrentProjectAction.SET_CURRENT_PROJECT:
        return action.payload;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ currentProjectState, currentProjectDispatch }}>{children}</Provider>;
};
