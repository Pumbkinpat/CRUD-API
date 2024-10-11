const { Schema, models, model } = require('mongoose');

const todoSchema = new Schema({
	text: {type: String, require: true},
	priority: {type: String, require: true},
	deadline: {type: String, require: true},
});

const Todo = models.Todo || new model("Todo", todoSchema); 
module.exports = Todo;