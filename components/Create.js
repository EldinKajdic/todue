import React, { Component } from "react";
import { Text, View, StyleSheet, Picker, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import storageHelper from "../shared/helpers/storage";

export class Create extends Component {
  mode = "date";
  isEdit = false;

  constructor(props) {
    super(props);
    let invoice = this.props.route.params.invoice;
    if (invoice) {
      this.isEdit = true;
      this.state = {
        id: invoice.id,
        dueDate: new Date(invoice.dueDate),
        invoiceType: invoice.invoiceType,
        reoccurring: invoice.reoccurring,
        company: invoice.company,
        amount: invoice.amount,
        isPaid: invoice.isPaid,
        currency: invoice.currency,
      };
    } else {
      this.state = {
        dueDate: new Date(),
        invoiceType: "rent",
        reoccurring: false,
      };
    }
  }

  saveValue(val, type) {
    if (val !== null) {
      switch (type) {
        case "company":
          this.setState({ company: val });
          break;
        case "amount":
          this.setState({ amount: val });
          break;
        case "invoiceType":
          this.setState({ invoiceType: val });
          break;
      }
    }
  }

  onSave = () => {
    if (!this.isEdit) {
      storageHelper.setInvoiceToStorage(this.state).then((success) => {
        if (success) {
          this.props.navigation.goBack();
        } else {
        }
      });
    } else {
      storageHelper.editInvoice(this.state).then((success) => {
        if (success) {
          let item = JSON.stringify(this.state);
          item = JSON.parse(item);
          this.props.navigation.navigate("Invoice", {
            item,
          });
        } else {
        }
      });
    }
  };

  render() {
    const { dueDate } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>
            {this.isEdit ? "Ändra faktura" : "Lägg till ny faktura"}
          </Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Företag"
              autoCapitalize="words"
              value={this.state.company}
              maxLength={50}
              returnKeyType="next"
              clearButtonMode="while-editing"
              onChangeText={(text) => this.saveValue(text, "company")}
              leftIcon={
                <Icon
                  name="building"
                  style={styles.iconInput}
                  size={25}
                  color="black"
                />
              }
            />
            <Input
              placeholder="Belopp"
              keyboardType="numeric"
              value={this.state.amount}
              returnKeyType="next"
              clearButtonMode="while-editing"
              onChangeText={(text) => this.saveValue(text, "amount")}
              maxLength={10}
              leftIcon={
                <Icon
                  name="dollar"
                  style={styles.iconInput}
                  size={25}
                  color="black"
                />
              }
            />
            <Text style={styles.pickerLabel}>När förfaller fakturan?</Text>
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              mode={this.mode}
              value={dueDate}
              is24Hour={true}
              display="default"
              onChange={(date) => {
                let dueDate = new Date(date.nativeEvent.timestamp);
                this.setState({ dueDate });
              }}
            />
            <Text style={styles.pickerLabel}>
              Vad är det för typ av faktura?
            </Text>
            <Picker
              style={styles.picker}
              value="rent"
              selectedValue={(this.state && this.state.invoiceType) || "rent"}
              onValueChange={(itemValue, itemIndex) =>
                this.saveValue(itemValue, "invoiceType")
              }
            >
              <Picker.Item label="Annat" value="other" />
              <Picker.Item label="Bredband eller TV" value="tv" />
              <Picker.Item label="Bil" value="car" />
              <Picker.Item label="Busskort" value="bus" />
              <Picker.Item label="Elräkning" value="electricity" />
              <Picker.Item label="Hyra" value="rent" />
              <Picker.Item label="Kreditkort" value="creditcard" />
              <Picker.Item label="Mobilräkning" value="phone" />
              <Picker.Item label="Möbler" value="home" />
            </Picker>
            <CheckBox
              title="Återkommande faktura"
              checked={this.state.reoccurring}
              onPress={() =>
                this.setState({ reoccurring: !this.state.reoccurring })
              }
            />
          </View>
          <Button
            icon={
              <Icon
                name="save"
                size={25}
                color="white"
                style={styles.iconSave}
              />
            }
            title="Spara faktura"
            style={styles.buttonSave}
            onPress={() => this.onSave()}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
  },
  subheader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    paddingTop: 10,
  },
  iconInput: {
    paddingRight: 10,
    paddingLeft: 10,
    minWidth: 42,
  },
  iconSave: {
    marginRight: 10,
  },
  buttonSave: {
    padding: 20,
  },
  picker: {},
  pickerLabel: {
    fontSize: 20,
    paddingLeft: 15,
    textAlign: "center",
  },
});

export default Create;
