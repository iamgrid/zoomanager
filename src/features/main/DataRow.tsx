import React from 'react';
import { dataItem, expositionFieldConfig, verseFieldConfig } from '../../types';
import DataEntry from './DataEntry';

interface DataRowProps {
	sectionId: number;
	rowId: number;
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

export default function DataRow({
	sectionId,
	rowId,
	itemData,
	fieldConfig,
}: DataRowProps): React.ReactElement {
	return (
		<div
			className='data_display__row'
			data-sectionid={sectionId}
			data-rowid={rowId}
		>
			{Object.keys(fieldConfig[sectionId][rowId]).map((entryId) => {
				return (
					<DataEntry
						key={entryId}
						sectionId={sectionId}
						rowId={rowId}
						entryId={Number(entryId)}
						itemData={itemData}
						fieldConfig={fieldConfig}
					/>
				);
			})}
		</div>
	);
}
