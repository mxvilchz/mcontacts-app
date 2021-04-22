/* eslint-disable no-unused-vars */
import * as SQLite from 'expo-sqlite'

class SQLiteConfig {
  constructor () {
    this.db = SQLite.openDatabase('db.db')
  }

  executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(sql, params, (tx, results) => {
          resolve(results)
        },
        (error) => {
          reject(error)
        })
      })
    })
  }
}

const sqlite = new SQLiteConfig()
export default sqlite
