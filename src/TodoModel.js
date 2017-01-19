class TodoModel {
  constructor(title, completed) {
    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.isDeleted = false;
  }
}

module.exports = TodoModel;
