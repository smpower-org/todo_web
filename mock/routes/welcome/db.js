const db = require('../../db')

db.serialize(() => {
  const sql = `
    CREATE TABLE IF NOT EXISTS welcome (
      id INTEGER PRIMARY KEY,
      message TEXT
    )
  `
  db.run(sql)
})

class Welcome {
  // Find all message
  static all(cb) {
    db.all('SELECT * FROM welcome', cb)
  }

  // Insert a message
  static insert(message, cb) {
    if (!message) throw new Error('Please provide a message.')
    const sql = `INSERT INTO welcome(message) VALUES(?)`
    db.run(sql, message, cb)
  }

  // Delete a message
  static delete(id, cb) {
    if (!id) throw new Error('Please provide an id.')
    const sql = `DELETE FROM welcome WHERE id = ?`
    db.run(sql, id, cb)
  }

  // Update a message
  static update(data, cb) {
    if (!data.id) throw new Error('Please provide an id.')
    if (!data.message) throw new Error('Please provide a message.')
    const sql = `UPDATE welcome SET message = ? WHERE id = ?`
    db.run(sql, data.message, data.id, cb)
  }

  // Find a message
  static find(id, cb) {
    if (!id) throw new Error('Please provide an id.')
    const sql = 'SELECT * FROM welcome WHERE id = ?'
    db.get(sql, id, cb)
  }
}

module.exports = db
module.exports.Welcome = Welcome
