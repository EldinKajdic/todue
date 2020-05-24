import React, { Component } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

export class PayList extends Component {
  list = [];

  constructor(props) {
    super(props);
    this.list = this.props.invoices;
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
        {this.list
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
    );
  }
}

export default PayList;
