import axios from 'axios';
import React, { useEffect } from 'react';
import { dataItem } from '../../types';
import useLocalStorage from '../../utils/useLocalStorage';
import { useSelector, useDispatch } from 'react-redux';
// import { ViewContext } from '../../ViewContext';
import common from '../../fieldConfigs/common.json';
import exposition from '../../fieldConfigs/exposition.json';
import {
	loadData,
	selectData,
	loadFieldConfigs,
	selectFieldConfigs,
} from './mainSlice';

export default function Main(): React.ReactElement {
	// const { activeView } = React.useContext(ViewContext);
	const [localStorageData, setLocalStorageData] = useLocalStorage('data', {
		newVisitor: true,
		actual: [],
	});

	const dispatch = useDispatch();
	const storeData = useSelector(selectData);
	const storeFieldConfigs = useSelector(selectFieldConfigs);
	console.log(storeFieldConfigs);

	useEffect(() => {
		dispatch(loadFieldConfigs({ common: common, exposition: exposition }));
	}, [dispatch]);

	useEffect(() => {
		let loadDataWasRun: boolean = false;
		function loadDataIntoMainStore(data: dataItem[]): void {
			dispatch(loadData(data));
		}

		if (localStorageData.newVisitor) {
			// this user has no localStorage data stored for us,
			// we'll fetch the contents of initialData.json to populate it
			const fetchUrl = '/zoomanager/initialData.json';
			axios
				.get(fetchUrl)
				.then((response) => {
					// console.log(response.data);
					setLocalStorageData({ newVisitor: false, actual: response.data });
					loadDataIntoMainStore(response.data);
					loadDataWasRun = true;
				})
				.catch((error) => {
					console.error(error);
				});
		}

		if (!loadDataWasRun) {
			loadDataIntoMainStore(localStorageData.actual);
		}
	});

	function renderDataTable(): React.ReactElement | null {
		if (storeData === undefined) return null;
		if (storeData.length < 1) return null;
		// console.log(storeData);
		return (
			<table data-testid='data_table'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Gender</th>
						<th>Species</th>
					</tr>
				</thead>
				<tbody>
					{storeData.map((item) => {
						if (item.id === undefined) return null;

						return (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td>{item.gender}</td>
								<td>{item.species}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	return (
		<div className='main' id='main'>
			{renderDataTable()}
		</div>
	);
}
