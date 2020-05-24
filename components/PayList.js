import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

export class PayList extends Component {
  months;

  constructor(props) {
    super(props);
    this.state = {
      months: {},
    };
  }

  componentDidMount() {
    this.getMonths();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.invoices != this.props.invoices) {
      this.getMonths();
    }
  }

  getMonths() {
    this.setMonths();
    if (this.props.invoices.length > 0) {
      this.props.invoices.forEach((invoice) => {
        let date = new Date(invoice.dueDate);
        let month = date.getMonth();
        this.months[month + 1].invoices.push(invoice);
      });
      this.setState({ months: this.months });
    } else {
      this.setState({ months: {} });
    }
  }

  getTotalAmount(invoices) {
    let total = 0;
    invoices.forEach((inv) => {
      total += parseInt(inv.amount);
    });

    return total;
  }

  setMonths() {
    this.months = {
      1: {
        month: "January",
        invoices: [],
      },
      2: {
        month: "Februari",
        invoices: [],
      },
      3: {
        month: "Mars",
        invoices: [],
      },
      4: {
        month: "April",
        invoices: [],
      },
      5: {
        month: "Maj",
        invoices: [],
      },
      6: {
        month: "Juni",
        invoices: [],
      },
      7: {
        month: "Juli",
        invoices: [],
      },
      8: {
        month: "Augusti",
        invoices: [],
      },
      9: {
        month: "September",
        invoices: [],
      },
      10: {
        month: "Oktober",
        invoices: [],
      },
      11: {
        month: "November",
        invoices: [],
      },
      12: {
        month: "December",
        invoices: [],
      },
    };
  }

  getBadgeColor = (item) => {
    let date = new Date();
    let dueDate = new Date(item.dueDate);
    var options = {
      month: "long",
    };
    let sameMonth =
      date.toLocaleDateString("sv-SE", options) ==
      dueDate.toLocaleDateString("sv-SE", options);
    let expired = date > dueDate;
    if (item.isPaid) {
      return "green";
    } else if (expired) {
      return "red";
    } else if (!item.isPaid && sameMonth) {
      return "orange";
    } else if (!item.isPaid && !expired) {
      return "blue";
    }
    return "green";
  };

  onPress = (item) => {
    this.props.onSelected(item);
  };

  getIcon(invoiceType) {
    switch (invoiceType) {
      case "creditcard":
        return "credit-card";
      case "electricity":
        return "lightbulb-outline";
      case "tv":
        return "tv";
      case "home":
      case "rent":
        return "home";
      case "car":
        return "directions-car";
      case "bus":
        return "directions-bus";
      case "phone":
        return "phone-iphone";
      default:
        return "attach-money";
    }
  }

  render() {
    return (
      <View>
        {Object.keys(this.state.months)
          .filter((key) => this.state.months[key].invoices.length > 0)
          .reverse()
          .map((key) => (
            <View key={key}>
              <Text style={styles.subheader}>
                {this.state.months[key].month}
                {" - "}
                {this.getTotalAmount(this.state.months[key].invoices)} kr
              </Text>
              {this.state.months[key].invoices
                .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
                .map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.company + ": " + item.amount + item.currency}
                    leftIcon={{ name: this.getIcon(item.invoiceType) }}
                    bottomDivider
                    chevron
                    onPress={() => this.onPress(item)}
                    badge={{
                      value: item.length,
                      textStyle: { color: "white" },
                      badgeStyle: {
                        backgroundColor: this.getBadgeColor(item),
                      },
                    }}
                  />
                ))}
            </View>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 14,
  },
});

export default PayList;
