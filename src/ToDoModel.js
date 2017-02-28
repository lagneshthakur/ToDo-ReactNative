class TodoModel {
  constructor(title, completed) {
    this.title = title;
    this.completed = completed || false;
    this.date = new Date();
  }
}

module.exports = TodoModel;