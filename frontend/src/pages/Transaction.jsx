import axios from "axios";
import { useState, useEffect } from "react";

const categories = [
	"Food",
	"Transport",
	"Shopping",
	"Bills",
	"Groceries",
	"Health",
	"Education",
	"Entertainment",
	"Travel",
	"Investments",
	"Salary",
	"Business",
	"EMI",
	"Utilities",
	"Rent",
	"Other",
];

const Transaction = () => {
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("Food");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [transactions, setTransactions] = useState([]);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [deleting, setDeleting] = useState(null);

	useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3000/api/transactions/list",
				{ withCredentials: true }
			);
			setTransactions(response.data.transactions || []);
		} catch (err) {
			console.error(err);
			setMessage("Failed to fetch transactions");
		} finally {
			setFetchLoading(false);
		}
	};

	const handleDelete = async (id) => {
		setDeleting(id);
		try {
			await axios.delete(
				`http://localhost:3000/api/transactions/delete/${id}`,
				{ withCredentials: true }
			);
			setTransactions(transactions.filter((t) => t._id !== id));
			setMessage("Transaction deleted successfully");
		} catch (err) {
			console.error(err);
			setMessage("Failed to delete transaction");
		} finally {
			setDeleting(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		const payload = {
			amount: Number(amount),
			category,
			description,
			date: date || undefined,
		};

		try {
			await axios.post(
				"http://localhost:3000/api/transactions/add",
				payload,
				{ withCredentials: true }
			);
			setMessage("Transaction created successfully.");
			setAmount("");
			setCategory("Food");
			setDescription("");
			setDate("");
			fetchTransactions();
		} catch (err) {
			console.error(err);
			setMessage(
				err?.response?.data?.message || "Failed to create transaction"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-dark min-h-screen p-6 font-jetbrains">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-sage mb-8">Expense Tracker</h1>

				{/* Form Section */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-1">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col items-start gap-4 bg-sage p-6 rounded-2xl text-accent2 font-jetbrains sticky top-6"
						>
							<h2 className="text-2xl font-bold text-black mb-2">
								Add Transaction
							</h2>

							<label className="w-full text-black">
								Amount
								<input
									type="number"
									name="amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									required
									className="mt-1 p-2 border-b rounded w-full"
									step="0.01"
								/>
							</label>

							<label className="w-full text-black">
								Category
								<select
									name="category"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									required
									className="mt-1 p-2 border-b rounded w-full"
								>
									{categories.map((c) => (
										<option key={c} value={c}>
											{c}
										</option>
									))}
								</select>
							</label>

							<label className="w-full text-black">
								Description
								<input
									type="text"
									name="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
									className="mt-1 p-2 border-b rounded w-full"
								/>
							</label>

							<label className="w-full text-black">
								Date
								<input
									type="date"
									name="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									className="mt-1 p-2 border-b rounded w-full"
								/>
							</label>

							<button
								type="submit"
								disabled={loading}
								className="button-primary mt-4 w-full"
							>
								{loading ? "Saving..." : "Add Transaction"}
							</button>

							{message && (
								<div className="mt-2 text-sm text-black bg-yellow-200 p-2 rounded w-full">
									{message}
								</div>
							)}
						</form>
					</div>

					{/* List Section */}
					<div className="lg:col-span-2">
						<div className="bg-sage p-6 rounded-2xl">
							<h2 className="text-2xl font-bold text-black mb-4">
								Your Transactions
							</h2>

							{fetchLoading ? (
								<p className="text-black">Loading transactions...</p>
							) : transactions.length === 0 ? (
								<p className="text-black">No transactions yet. Add one above!</p>
							) : (
								<div className="overflow-x-auto">
									<table className="w-full text-sm text-black">
										<thead className="border-b-2 border-black">
											<tr>
												<th className="text-left p-2">Date</th>
												<th className="text-left p-2">Category</th>
												<th className="text-left p-2">Description</th>
												<th className="text-right p-2">Amount</th>
												<th className="text-center p-2">Action</th>
											</tr>
										</thead>
										<tbody>
											{transactions.map((t) => (
												<tr
													key={t._id}
													className="border-b border-gray-300 hover:bg-gray-100"
												>
													<td className="p-2">
														{new Date(t.date).toLocaleDateString()}
													</td>
													<td className="p-2">{t.category}</td>
													<td className="p-2">{t.description}</td>
													<td className="text-right p-2 font-bold">
														₹{t.amount?.toFixed(2)}
													</td>
													<td className="text-center p-2">
														<button
															onClick={() => handleDelete(t._id)}
															disabled={deleting === t._id}
															className="text-red-500 hover:text-red-700 disabled:opacity-50"
														>
															{deleting === t._id ? "..." : "Delete"}
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Transaction;
