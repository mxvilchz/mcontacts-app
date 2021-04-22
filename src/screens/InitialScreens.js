/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, ActivityIndicator, View, SafeAreaView } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import firebase from '../databases/firebase'
import sqlite from '../databases/sqlite'
import { goToHome, setUsers } from '../actions'

const InitialScreens = ({ navigation }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const createTable = async () => {
      try {
        const searchTable = await sqlite.executeQuery("SELECT name FROM sqlite_master WHERE type='table' AND name='users';", [])
        if (searchTable.rows.length === 0) {
          await sqlite.executeQuery('DROP TABLE IF EXISTS users', [])
          await sqlite.executeQuery('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), lastname VARCHAR(100), phone VARCHAR(20), email VARCHAR(255))', [])
        } else {
          await sqlite.executeQuery('DELETE FROM users', [])
          await sqlite.executeQuery("DELETE FROM SQLITE_SEQUENCE WHERE name='users'", [])
        }
      } catch (error) {
        console.log(1, error)
      }
    }
    createTable()
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      await firebase.db.collection('users').onSnapshot(querySnapshot => {
        const users = []
        querySnapshot.docs.forEach(doc => {
          const { name, lastname, phone, email } = doc.data()
          users.push({ name, lastname, phone, email })
        })

        if (users.length > 0) {
          let query = 'INSERT INTO users (name, lastname, phone, email) VALUES'
          for (let i = 0; i < users.length; ++i) {
            query = query + `('${users[i].name}', '${users[i].lastname}', '${users[i].phone}', '${users[i].email}')`
            if (i !== users.length - 1) {
              query = query + ','
            }
          }
          query = query + ';'
          usersInsert(query)
        }
        setLoading(false)
      })
    }
    getUsers()
  }, [])

  const usersInsert = async (sql) => {
    try {
      const executeQuery = await sqlite.executeQuery(sql, [])
      if (executeQuery.rowsAffected > 0) {
        const selectQuery = await sqlite.executeQuery('SELECT * FROM users', [])
        const rows = selectQuery.rows
        const users = []
        for (let i = 0; i < rows.length; i++) {
          const item = rows.item(i)
          users.push(item)
        }
        dispatch(setUsers(users))
      }
    } catch (error) {
      console.log(2, error)
    }
  }

  const goToHomeScreen = () => {
    dispatch(goToHome())
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        {
          loading ? (
            <>
              <ActivityIndicator color="#707070" />
              <Text style={{ marginVertical: 20, color: '#707070' }}>Cargando...</Text>
            </>
          ) : (
            <>
              <Text style={{ marginVertical: 20, color: '#707070' }}>Datos cargados!</Text>
              <Button mode="contained" onPress={goToHomeScreen}>
                Continuar
              </Button>
            </>
          )
        }
      </View>
    </SafeAreaView>
  )
}

InitialScreens.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default InitialScreens

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
