import React from 'react';
import { dataItem, expositionFieldConfig, verseFieldConfig } from '../../types';
import DataRow from './DataRow';

interface DataSectionProps {
	sectionId: number;
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

export default function DataSection({
	sectionId,
	itemData,
	fieldConfig,
}: DataSectionProps): React.ReactElement {
	return (
		<div className='data_display__section' data-sectionid={sectionId}>
			{Object.keys(fieldConfig[sectionId]).map((rowId) => {
				return (
					<DataRow
						key={rowId}
						sectionId={sectionId}
						rowId={Number(rowId)}
						itemData={itemData}
						fieldConfig={fieldConfig}
					/>
				);
			})}
		</div>
	);
}
