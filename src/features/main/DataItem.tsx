import React from 'react';
import { dataItem, expositionFieldConfig, verseFieldConfig } from '../../types';
// import { ViewContext } from '../../ViewContext';
import DataSection from './DataSection';

interface DataItemProps {
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

export default function DataItem({
	itemData,
	fieldConfig,
}: DataItemProps): React.ReactElement {
	// const { activeView } = React.useContext(ViewContext);

	return (
		<div className='data_display__item'>
			{Object.keys(fieldConfig).map((sectionId) => {
				return (
					<DataSection
						key={sectionId}
						sectionId={Number(sectionId)}
						itemData={itemData}
						fieldConfig={fieldConfig}
					/>
				);
			})}
		</div>
	);
}
