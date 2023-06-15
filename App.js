import React, { Component } from "react";
import { render } from "react-dom";
import {FlatList, View, StyleSheet, StatusBar, SafeAreaView, Text} from 'react-native'
import axios from "axios";


const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>Name: {title.Name}</Text>
    <Text style={styles.title}>Description: {title.Circle}</Text>
  </View>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "React/Parcel Starter",
      persons: []
    };
  }
  componentDidMount() {
    axios.get(`https://api.postalpincode.in/postoffice/tadas`).then(res => {

      this.setState({ persons : res.data[0].PostOffice });
    });
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.persons}
        renderItem={({item}) => <Item title={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'column'
  },
  title: {
    fontSize: 15,
  },
});

export default App;