import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface RepoState {
	repo: any[]; // Change `any[]` to the correct type of your API response
}

export const fetchRepo = createAsyncThunk('repo/fetchRepo', async (param: { owner: string; repo: string }, thunkAPI) => {
	try {
		const response = await axios.get(`https://api.github.com/repos/${param.owner}/${param.repo}`);
		return response.data;
	} catch (error) {
		throw new Error('Error fetching issues');
	}
});

const initialState: RepoState = {
	repo: [],
};

const repoSlice = createSlice({
	name: 'repo',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchRepo.fulfilled, (state, action) => {
			state.repo = [action.payload];
		});
	},
});

export const repoReduser = repoSlice.reducer;
