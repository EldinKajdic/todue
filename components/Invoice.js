import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class Invoice extends Component {
  state = {
    invoice: this.props.route.params.item,
  };

  getAmountTitle() {
    return this.state.invoice.isPaid ? "Betalt: " : "Att betala: ";
  }

  getSubheaderStyle() {
    return this.state.invoice.isPaid ? { color: "green" } : { color: "red" };
  }

  getDueDate() {
    let date = new Date(this.state.invoice.dueDate);
    var options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("sv-SE", options).toLowerCase();
  }

  isSameMonth() {
    let date = new Date();
    var options = {
      month: "long",
    };
    return (
      date.toLocaleDateString("sv-SE", options).toLowerCase() ==
      this.state.invoice.item.month.toLowerCase()
    );
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.state.invoice.company}</Text>
        <Text style={styles.subheader}>
          Status:
          <Text style={this.getSubheaderStyle()}>
            {this.state.invoice.isPaid ? " BETALD" : " EJ BETALD"}
          </Text>
        </Text>
        <View style={styles.invoiceContainer}>
          <Text style={styles.invoiceRowTitle}>{this.getAmountTitle()}</Text>
          <Text style={styles.invoiceRowText}>
            {this.state.invoice.amount + " " + this.state.invoice.currency}
          </Text>
        </View>
        <View style={styles.invoiceContainer}>
          <Text style={styles.invoiceRowTitle}>Förfaller:</Text>
          <Text style={styles.invoiceRowText}>{this.getDueDate()}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  header: {
    fontSize: 36,
    textAlign: "center",
  },
  subheader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  invoiceContainer: {
    paddingTop: 20,
  },
  invoiceRowTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  invoiceRowText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default Invoice;
