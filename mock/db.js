const Sqlite = require('sqlite3').verbose()
const dbName = 'todo.db'

module.exports = new Sqlite.cached.Database(dbName)
