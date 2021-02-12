import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk, RootState } from '../../store';
import { RootState } from '../../store';
import { dataItem, fieldConfigs } from '../../types';

const initialData: dataItem[] = [];
const initialFieldConfigs: fieldConfigs | object = {};

const initialState = { data: initialData, fieldConfigs: initialFieldConfigs };

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		loadData: (state, action: PayloadAction<dataItem[]>) => {
			state.data = action.payload;
		},
		loadFieldConfigs: (state, action: PayloadAction<fieldConfigs>) => {
			state.fieldConfigs = action.payload;
		},
		/*addRecord: state => {
			// state.value -= 1;
		},
		editRecord: (state, action: PayloadAction<number>) => {
			// state.value += action.payload;
		},
		deleteRecord: state => {

		}*/
	},
});

export const { loadData, loadFieldConfigs } = mainSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

export const selectData = (state: RootState) => state.main.data;
export const selectFieldConfigs = (state: RootState) => state.main.fieldConfigs;

export default mainSlice.reducer;
