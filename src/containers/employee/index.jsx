import React, { useEffect, useState } from 'react';
import './index.scss';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { getEmployees } from './Actions';
import { employeeDatas } from './employeeData';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Employee(props) {
	const { dispatch, getAllEmployees } = props;
	const [employeeData, setEmployeeData] = useState([]);
	useEffect(() => {
		const {
			response: { data },
			response,
			status,
			isFetching,
			isError,
		} = getAllEmployees;
		if (status === 200 && !isFetching && !isError) {
			setEmployeeData(data);
		} else if (!isFetching && !isError) {
			setEmployeeData(employeeDatas);
		}
	}, [getAllEmployees]);
	useEffect(() => {
		dispatch(getEmployees());
	}, []);
	return (
		<Container className="p-5">
			<Button style={{ float: 'right' }}>
				<ReactHTMLTableToExcel
					id="test-table-xls-button"
					// className="download-table-xls-button"
					table="table-to-xls"
					filename="tablexls"
					sheet="tablexls"
					buttonText="Download as XLS"
				/>
			</Button>
			<Table striped bordered hover size={'md'} id="table-to-xls">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Role</th>
						<th>Description</th>
						<th>Mobile Number</th>
						<th>active</th>
					</tr>
				</thead>
				<tbody>
					{employeeData &&
						employeeData.map((employee, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{employee.name}</td>
									<td>{employee.role}</td>
									<td>{employee.description}</td>
									<td>{employee.mobileNo}</td>
									<td
										style={{
											color: employee.active ? 'green' : 'red',
										}}
									>
										{employee.active ? 'Active' : 'In-Active'}
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</Container>
	);
}

export default connect(({ getAllEmployees }) => ({
	getAllEmployees,
}))(Employee);
