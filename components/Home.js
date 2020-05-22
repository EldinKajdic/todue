import React, { Component } from "react";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";
import PayList from "./PayList";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import storageHelper from "../shared/helpers/storage";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
    };
  }

  componentDidMount() {
    storageHelper.getInvoicesFromStorage().then((x) => {
      if (x !== null) {
        this.setState({ invoices: x, fetching: false });
      } else {
        this.setState({ invoices: [], fetching: false });
      }
    });
  }

  onSelected = (item) => {
    this.props.navigation.navigate("Invoice", {
      item,
    });
  };

  navigate = (url) => {
    this.props.navigation.navigate(url, {});
  };

  render() {
    if (!this.state.fetching) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Dina fakturor</Text>
          <PayList
            onSelected={this.onSelected}
            invoices={this.state.invoices}
          ></PayList>
          <Button
            icon={
              <Icon
                name="plus"
                size={25}
                color="white"
                style={styles.iconAdd}
              />
            }
            title="Lägg till ny faktura"
            style={styles.buttonAdd}
            onPress={() => this.navigate("Create")}
          />
        </View>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    backgroundColor: "white",
  },
  iconAdd: {
    marginRight: 10,
  },
  buttonAdd: {
    padding: 20,
  },
});

export default Home;
