import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DashboardContent from "../../components/DashboardContent";

function Settings() {
	const [users, setUsers] = useState([]);

	const deleteHandler = (e, id) => {
		e.preventDefault();
		fetch(`http://localhost:5010/user/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => {
				console.log(err);
			});
	};

	const columns = [
		{
			name: "ID",
			selector: (row) => row._id,
		},
		{
			name: "Full name",
			selector: (row) => row.fullName,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
		},
		{
			name: "Delete",
			selector: (row) => (
				<button
					type="button"
					onClick={(e) => deleteHandler(e, row._id)}
				>
					del
				</button>
			),
		},
	];

	useEffect(() => {
		fetch(`http://localhost:5010/user/list`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((result) => setUsers(result))
			.catch((err) => {
				console.log(err);
			});
	}, [users]);
	return (
		<DashboardContent>
			<h1>User list</h1>
			<DataTable columns={columns} data={users} />
		</DashboardContent>
	);
}

export default Settings;