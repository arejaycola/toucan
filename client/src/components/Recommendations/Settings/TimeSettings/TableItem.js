import React, { useState, useContext } from 'react';
import { RecommendationSettingsContext } from '../../../../contexts/RecommendationSettingsContext';

const TableItem = ({ id, text }) => {
	const [isSelected, setIsSelected] = useState(false);
	const { setSelectedElement } = useContext(RecommendationSettingsContext);

	const onTableClick = (e) => {
		if (document.getElementsByClassName('table-item-selected')[0]) {
			document.getElementsByClassName('table-item-selected')[0].className = 'table-item';
		}

		setSelectedElement(e.target.id);
		setIsSelected(!isSelected);
	};

	return (
		<td className={isSelected ? 'table-item-selected' : 'table-item'} id={id} onClick={(e) => onTableClick(e)}>
			{text}
		</td>
	);
};
export default TableItem;
