import React from 'react';
import moment from 'moment';
import { Modal } from 'react-bootstrap';

const ModalXLarge = (props) => {
	return (
		<Modal dialogClassName="xl-modal" show={props.showChart} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
		</Modal>
	);
};

export default ModalXLarge;
