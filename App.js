import React, {Component} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title.Name}</Text>
    <Text style={styles.title}>{title.BranchType}</Text>
    <Text style={styles.title}>{title.State}</Text>
    <Text style={styles.title}>{title.Pincode}</Text>
  </View>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      value: '',
      loading: false,
    };
  }
  searchPostOffices = () => {
    if (this.state.value === '') {
      alert('Please enter city name.');
    } else {
      this.setState({loading: true, persons: []});
      axios
        .get(`https://api.postalpincode.in/postoffice/${this.state.value}`)
        .then(res => {
          if (res.status === 200) {
            this.setState({loading: false});
            if (res.data[0].Status === 'Success') {
              this.setState({persons: res.data[0].PostOffice});
            } else if (res.data[0].Status === 'Error') {
              alert(res.data[0].Message);
            }
          } else if (res.status >= 500 || res.status === 400) {
            alert('Something went wrong, please try agin later.');
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Search Post office"
            style={styles.inputForm}
            onChangeText={value => this.setState({value})}></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={this.searchPostOffices}>
            <Text style={styles.text}>Search</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color="#FF8333"
            style={{marginTop: '50%'}}
          />
        ) : (
          <FlatList
            data={this.state.persons}
            renderItem={({item}) => <Item title={item} />}
            keyExtractor={item => {
              return item.id;
            }}
          />
        )}
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
    backgroundColor: '#FCFCFC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'column',
    borderRadius: 16,
    borderColor: '#FF8333',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  inputForm: {
    borderWidth: 1,
    borderRadius: 100,
    marginVertical: 16,
    width: '60%',
    marginLeft: '5%',
    borderColor: '#FF8333',
    marginLeft: ' 5%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF8333',
    padding: 10,
    width: '25%',
    height: '60%',
    marginTop: '4%',
    marginLeft: '2%',
    borderRadius: 25,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default App;
