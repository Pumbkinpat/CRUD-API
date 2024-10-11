const express = require('express');
const dotenv = require('dotenv');
const connectToDb = require('./database/db.js');
const Todo = require('./models/todo.model.js');

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

connectToDb();

app.get('/', (req, res) => {
	res.send('server is running');
});

app.get('/todos', async (req, res) => {
	try {
		const result = await Todo.find();
		res.send({
			susscess: true,
			message: 'Todo list retreived sucessfully',
			data: result
		});
	} catch (err) {
		console.log(err);
		res.send({
			susscess: false,
			message: 'Failed to retreived Todo list',
			data: null
		});
	}
});

app.get('/todos/:todoId', async (req, res) => {
	const { params: { todoId } } = req;
	try {
		const result = await Todo.findById(todoId);
		res.send({
			success: true,
			message: `Todo list ${todoId} retreived successfully`,
			data: result
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: `Failed to retreived Todo ${todoId}`,
			data: null
		});
	}
});

app.post('/create-todo', async (req, res) => {
	const todoDetails = req.body;
	try {
		const result = await Todo.create(todoDetails);
		res.send({
			success: true,
			message: 'Todo created sucessfully',
			data: result
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: 'Failed to create todo',
			data: null
		});
	}
});

app.patch('/todos/:todoId', async (req, res) => {
	const { params: { todoId } } = req;
	const updatedTodo = req.body;
	try {
		const result = await Todo.findByIdAndUpdate(todoId, updatedTodo);
		res.send({
			success: true,
			message: `Todo list ${todoId} update successfully`,
			data: result
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: `Failed to update Todo ${todoId}`,
			data: null
		});
	}
});

app.delete('/todos/:todoId', async (req, res) => {
	const { params: { todoId } } = req;
	try {
		await Todo.findByIdAndDelete(todoId);
		res.send({
			success: true,
			message: `Todo list ${todoId} delete successfully`,
			data: null
		});
	} catch (err) {
		console.log(err);
		res.send({
			success: false,
			message: `Failed to delete Todo ${todoId}`,
			data: null
		});
	}
});

app.listen(port, () => {
	console.log(`server running on http://localhost:${port}`);
});