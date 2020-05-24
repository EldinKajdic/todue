import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import PayList from "./PayList";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import storageHelper from "../shared/helpers/storage";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      invoices: [],
    };
  }

  componentDidMount() {
    this.updateView();

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.updateView();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  updateView() {
    this.getInvoicesFromStorage();
  }

  getInvoicesFromStorage() {
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

  navigate = (url, prop) => {
    this.props.navigation.navigate(url, { prop });
  };

  render() {
    if (!this.state.fetching) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.header}>Välkommen!</Text>
            <Text style={styles.subheader}>
              {" "}
              {this.state.invoices.length > 0
                ? "Dina fakturor"
                : "Du har inga fakturor"}{" "}
            </Text>
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
              onPress={() => this.navigate("Create", this.state.invoices)}
            />
          </ScrollView>
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
  subheader: {
    textAlign: "center",
    fontSize: 30,
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
