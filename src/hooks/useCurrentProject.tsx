import React, { createContext, useContext, useReducer, Dispatch } from 'react';

import { Project, User } from '../types/custom';

export enum CurrentProjectAction {
  SET_CURRENT_PROJECT = 'set/project',
}

type State = {
  viewer: User | null,
  project: Project | null,
};

type Action = {
  type: CurrentProjectAction,
  payload: State,
};

type ProjectContext = {
  currentProjectState: State,
  currentProjectDispatch: Dispatch<Action>
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case CurrentProjectAction.SET_CURRENT_PROJECT:
      return {
        ...state,
        viewer: action.payload.viewer,
        project: action.payload.project,
      };
    default:
      return state;
  }
};

const initialState: State = {
  viewer: null,
  project: null,
};

export const CurrentProjectContext = createContext<ProjectContext>({
  currentProjectState: initialState,
  currentProjectDispatch: () => null,
});

const { Provider } = CurrentProjectContext;

export const CurrentProjectProvider: React.FC = ({ children }) => {
  const [currentProjectState, currentProjectDispatch] = useReducer(reducer, initialState);

  return <Provider value={{ currentProjectState, currentProjectDispatch }}>{children}</Provider>;
};

export const useCurrentProject = (): ProjectContext => useContext(CurrentProjectContext);
