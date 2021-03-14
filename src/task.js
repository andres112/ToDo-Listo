export function Task({ id, name, category = [], priority = "", date }) {
  this.id = id;
  this.name = name;
  this.category = category;
  this.priority = priority;
  this.date = date;
}
