import React from 'react';
import { dataItem, expositionFieldConfig, verseFieldConfig } from '../../types';
// import { ViewContext } from '../../ViewContext';

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
	const entryConfig = fieldConfig[sectionId][rowId][entryId];
	const entryConfigId = entryConfig.id;
	let disp = itemData[entryConfigId];
	const classes = ['data_display__entry'];
	classes.push('text_' + entryConfig.fontSize);
	classes.push('text_' + entryConfig.cssClass);

	return (
		<div
			className={classes.join(' ')}
			data-sectionid={sectionId}
			data-rowid={rowId}
			data-entryid={entryId}
			data-tmpid={entryConfigId}
		>
			<span className='data_display__prefix'>
				{entryConfig.prefix.replace(' ', '\u00A0')}
			</span>
			<span className='data_display__entry_proper'>{disp}</span>
			<span className='data_display__suffix'>{entryConfig.suffix}</span>
		</div>
	);
}
