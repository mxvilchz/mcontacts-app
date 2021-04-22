import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, SafeAreaView, SectionList, Text } from 'react-native'
import { FAB, List, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'

const HomeScreens = ({ navigation }) => {
  const { users } = useSelector(state => state.contact)
  console.log(users)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
       <SectionList
          contentContainerStyle={{ padding: 15 }}
          sections={users}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={item.name}
                description={item.phone}
              />
              <Divider />
            </>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontSize: 32, color: '#000', fontWeight: 'bold' }}>{title}</Text>
          )}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('Contact')}
        />
      </View>
    </SafeAreaView>
  )
}

HomeScreens.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HomeScreens

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
})
