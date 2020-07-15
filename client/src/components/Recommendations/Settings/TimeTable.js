import React from 'react';
import { Col, Row, Button, Table } from 'react-bootstrap';
import TableItem from './TableItem';

const TimeTable = () => {

	return (
		<Table bordered>
			<tbody>
				<tr>
					<TableItem id="this-week" text="This Week" />
					<TableItem id="last-month" text="Last Month" />
					<TableItem id="this-year" text="This Year" />
				</tr>
				<tr>
					<TableItem id="last-week" text="Last Week" />
					<TableItem id="last-three-months" text="Last 3 Months" />
					<TableItem id="last-year" text="Last Year" />
				</tr>
				<tr>
					<TableItem id="this-month" text="This Month" />
					<TableItem id="last-six-months" text="Last 6 Months" />
					<TableItem id="beginning-of-time" text="Beginning of Time" />
				</tr>
			</tbody>
		</Table>
	);
};
export default TimeTable;
