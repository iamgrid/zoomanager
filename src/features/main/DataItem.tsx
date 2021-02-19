import React from 'react';
import {
	configItemId,
	dataItem,
	expositionFieldConfig,
	verseFieldConfig,
} from '../../types';
import { ViewContext } from '../../ViewContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displays from './displays';

interface DataItemProps {
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

export default function DataItem({
	itemData,
	fieldConfig,
}: DataItemProps): React.ReactElement {
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

interface DataSectionProps {
	sectionId: number;
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

function DataSection({
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

interface DataRowProps {
	sectionId: number;
	rowId: number;
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

function DataRow({
	sectionId,
	rowId,
	itemData,
	fieldConfig,
}: DataRowProps): React.ReactElement | null {
	let rowIcon = null;
	const firstEntryFieldConfig: any = Object.values(
		fieldConfig[sectionId][rowId]
	)[0];

	if (firstEntryFieldConfig.hasOwnProperty('icon')) {
		if (firstEntryFieldConfig.icon.length > 0) {
			rowIcon = (
				<div className='data_display__row_icon'>
					<FontAwesomeIcon icon={firstEntryFieldConfig.icon} />
				</div>
			);
		}
	}

	// return null if none of the entries have any text content
	let hasContent = false;
	Object.values(fieldConfig[sectionId][rowId]).forEach((entry) => {
		const entryId = entry.id as configItemId;
		if (entryId === 'diet') hasContent = true;
		if (itemData[entryId] !== '') hasContent = true;
	});

	if (!hasContent) return null;

	return (
		<div
			className='data_display__row'
			data-sectionid={sectionId}
			data-rowid={rowId}
		>
			{rowIcon}
			<div className='data_display__row_content'>
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
		</div>
	);
}

interface DataEntryProps {
	sectionId: number;
	rowId: number;
	entryId: number;
	itemData: dataItem;
	fieldConfig: expositionFieldConfig | verseFieldConfig;
}

function DataEntry({
	sectionId,
	rowId,
	entryId,
	itemData,
	fieldConfig,
}: DataEntryProps): React.ReactElement {
	const { activeView } = React.useContext(ViewContext);

	const entryConfig = fieldConfig[sectionId][rowId][entryId];
	const entryConfigId = entryConfig.id;
	const disp = itemData[entryConfigId];

	const [front, middle, back] = displays[entryConfigId].combine(
		entryConfig,
		activeView,
		disp,
		itemData
	);

	return (
		<div
			className='data_display__entry'
			data-sectionid={sectionId}
			data-rowid={rowId}
			data-entryid={entryId}
			data-tmpid={entryConfigId}
		>
			{front}
			{middle}
			{back}
		</div>
	);
}
