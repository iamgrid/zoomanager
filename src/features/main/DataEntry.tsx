import React from 'react';
import { dataItem, expositionFieldConfig, verseFieldConfig } from '../../types';

interface DataEntryProps {
	sectionId: number;
	rowId: number;
	entryId: number;
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

export default function DataEntry({
	sectionId,
	rowId,
	entryId,
	itemData,
	fieldConfig,
}: DataEntryProps): React.ReactElement {
	const entryConfig = fieldConfig[sectionId][rowId][entryId];
	const entryConfigId = entryConfig.id;
	let show = '';
	// if (typeof itemData[entryConfigId] === 'string') {
	show = itemData[entryConfigId];
	// }
	return (
		<div
			className='data_display__entry'
			data-sectionid={sectionId}
			data-rowid={rowId}
			data-entryid={entryId}
			data-tmpid={entryConfigId}
		>
			{show}
		</div>
	);
}
