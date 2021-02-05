import axios from 'axios';
import React, { useEffect } from 'react';
// import { dataItem } from './mainDataInterface';
import useLocalStorage from '../../utils/useLocalStorage';
import { useSelector, useDispatch } from 'react-redux';
import { load, selectData } from './mainSlice';

interface MainProps {
	activeView: string;
}

export default function Main({ activeView }: MainProps) {
	const [localStorageData, setLocalStorageData] = useLocalStorage('data', [
		'newVisitor',
	]);
	const storeData = useSelector(selectData);
	const dispatch = useDispatch();
	// const [dataWasLoaded, setDataWasLoaded] = React.useState(false);

	useEffect(() => {
		let loadWasRun: boolean = false;
		function loadDataIntoMainStore(data: any): void {
			dispatch(load(data));
			// setDataWasLoaded(true);
		}

		if (localStorageData[0] === 'newVisitor') {
			// this user has no localStorage data stored for us,
			// we'll fetch the contents of initialData.json to populate it
			// const fetchUrl = 'https://iamgrid.co.uk/zoomanager/initialData.json';
			const fetchUrl = '/zoomanager/initialData.json';
			axios
				.get(fetchUrl)
				.then((response) => {
					console.log(response);
					setLocalStorageData(response.data);
					loadDataIntoMainStore(response.data);
					loadWasRun = true;
				})
				.catch((error) => {
					console.error(error);
				});
		}

		if (!loadWasRun) {
			loadDataIntoMainStore(localStorageData);
		}
	}, [localStorageData, setLocalStorageData, dispatch]);

	function renderDataTable(): JSX.Element | null {
		if (storeData.length < 1) return null;
		return (
			<table>
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
