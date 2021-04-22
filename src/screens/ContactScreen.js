import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { TextInput, Title, Button, HelperText } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormik } from 'formik'

import firebase from '../databases/firebase'
import { contactValidationSchema } from '../config/schemas'

const ContactScreen = ({ navigation }) => {
  const formik = useFormik({
    validationSchema: contactValidationSchema,
    initialValues: {
      name: '', lastname: '', phone: '', email: ''
    },
    onSubmit: values => handleSave(values)
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button mode="text" compact onPress={formik.handleSubmit} disabled={!formik.isValid}>
          Listo
        </Button>
      ),
      headerRightContainerStyle: {
        paddingRight: 15
      }
    })
  }, [navigation, formik.isValid])

  const handleSave = async (values) => {
    try {
      await firebase.db.collection('users').add({
        name: values.name, lastname: values.lastname, phone: values.phone, email: values.email
      })

      formik.resetForm()
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.body}>

          <Title style={styles.title}>Nuevo contacto</Title>

          <View style={styles.input}>
            <TextInput
              label="Nombre"
              value={formik.values.name}
              mode="outlined"
              onChangeText={formik.handleChange('name')}
            />
            <HelperText type="error" visible={formik.touched.name && formik.errors.name}>
              {formik.errors.name}
            </HelperText>
          </View>

          <View style={styles.input}>
            <TextInput
              label="Apellido"
              value={formik.values.lastname}
              mode="outlined"
              onChangeText={formik.handleChange('lastname')}
              style={styles.input}
            />
            <HelperText type="error" visible={formik.touched.lastname && formik.errors.lastname}>
              {formik.errors.lastname}
            </HelperText>
          </View>

          <Title style={styles.title}>Agregar teléfono</Title>

          <View style={styles.input}>
            <TextInput
              label="Teléfono"
              value={formik.values.phone}
              mode="outlined"
              onChangeText={formik.handleChange('phone')}
              keyboardType="phone-pad"
            />
            <HelperText type="error" visible={formik.touched.phone && formik.errors.phone}>
              {formik.errors.phone}
            </HelperText>
          </View>

          <Title style={styles.title}>Agregar correo</Title>

          <View style={styles.input}>
            <TextInput
              label="Correo electrónico"
              value={formik.values.email}
              mode="outlined"
              onChangeText={formik.handleChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <HelperText type="error" visible={formik.touched.email && formik.errors.email}>
              {formik.errors.email}
            </HelperText>
          </View>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

ContactScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default ContactScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: 20
  },
  title: {
    marginVertical: 10
  },
  input: {
    marginBottom: 0
  }
})
