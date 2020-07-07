import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';

const ModalXLarge = (props) => {
	return (
		<Container>
			<Row>
				<Modal dialogClassName="xl-modal" show={props.showChart} onHide={props.onHide}>
					<Modal.Header closeButton>
						<Modal.Title>{props.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{props.children}</Modal.Body>
				</Modal>
			</Row>
		</Container>
	);
};

export default ModalXLarge;
