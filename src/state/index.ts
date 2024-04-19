import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { issuesReduser } from './reduser/issueesReduser.ts';
import { repoReduser } from './reduser/repoReduser.ts';

const rootReduser = combineReducers({
	issues: issuesReduser,
	repo: repoReduser,
});

export const store = configureStore({
	reducer: rootReduser,
});

export default store;
export type RootState = ReturnType<typeof rootReduser>;
