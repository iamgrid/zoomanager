import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk, RootState } from '../../store';
import { RootState } from '../../store';
import { dataItem } from './mainDataInterface';

const initialData: dataItem[] = [];
const initialState = { data: initialData };

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		load: (state, action: PayloadAction<dataItem[]>) => {
			state.data = action.payload;
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

export const { load } = mainSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

export const selectData = (state: RootState) => state.main.data;

export default mainSlice.reducer;
