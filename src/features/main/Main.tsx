import axios from 'axios';
import React, { useEffect } from 'react';
import {
	configItemId,
	dataItem,
	fieldConfigs,
	rawFieldConfigs,
} from '../../types';
import useLocalStorage from '../../utils/useLocalStorage';
import { useSelector, useDispatch } from 'react-redux';
import { ViewContext } from '../../ViewContext';
import common from '../../fieldConfigs/common.json';
import exposition from '../../fieldConfigs/exposition.json';
import verse from '../../fieldConfigs/verse.json';
import {
	loadData,
	selectData,
	loadFieldConfigs,
	selectFieldConfigs,
} from './mainSlice';
import { processFieldConfigs } from '../../utils/helpers';
import DataItem from './DataItem';

export default function Main(): React.ReactElement {
	const { activeView } = React.useContext(ViewContext);
	const [localStorageData, setLocalStorageData] = useLocalStorage('data', {
		newVisitor: true,
		actual: [],
	});

	const dispatch = useDispatch();
	const storeData = useSelector(selectData);
	const storeFieldConfigs = useSelector(selectFieldConfigs);
	// console.log(storeFieldConfigs);

	useEffect(() => {
		const rawFieldConfigs: rawFieldConfigs = {
			common,
			exposition: [],
			verse: [],
		};
		rawFieldConfigs.exposition = exposition.map((item) => {
			const itemId: configItemId = item.id as configItemId;
			return { ...item, id: itemId };
		});

		rawFieldConfigs.verse = verse.map((item) => {
			const itemId: configItemId = item.id as configItemId;
			return { ...item, id: itemId };
		});

		const processedFieldConfigs: fieldConfigs = processFieldConfigs(
			rawFieldConfigs
		);
		dispatch(loadFieldConfigs(processedFieldConfigs));

		console.log('ran loadFieldConfigs effect');
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

	function dataDisplay(): React.ReactElement | null {
		if (storeData === undefined) return null;
		if (storeData.length < 1) return null;
		if (Object.keys(storeFieldConfigs[activeView]).length < 1) return null;
		// console.log(storeFieldConfigs[activeView]);

		return (
			<div
				data-testid='data_display'
				className={'data_display data_display--' + activeView}
			>
				{storeData.map((item) => {
					return (
						<DataItem
							key={item.id}
							itemData={item}
							fieldConfig={storeFieldConfigs[activeView]}
						/>
					);
				})}
			</div>
		);
	}

	return (
		<div className='main' id='main'>
			{dataDisplay()}
		</div>
	);
}
