import React, { createContext, useContext, useReducer, Dispatch } from 'react';

import { Project, ProjectRelatedClient, ProjectRelatedFreelancer, User } from '../types/custom';

export enum CurrentProjectAction {
  SET = 'SET_CURRENT_PROJECT',
  RESET = 'RESET_CURRENT_PROJECT',
}

type State = {
  viewer: User | ProjectRelatedClient['user'] | ProjectRelatedFreelancer['user'] | null,
  project: Project | null,
};

type Action = {
  type: CurrentProjectAction,
  payload?: State,
};

type ProjectContext = {
  currentProjectState: State,
  currentProjectDispatch: Dispatch<Action>
};

const initialState: State = {
  viewer: null,
  project: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case CurrentProjectAction.SET:
      return {
        ...state,
        viewer: action.payload.viewer,
        project: action.payload.project,
      };
    case CurrentProjectAction.RESET:
      return initialState;
    default:
      return state;
  }
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
