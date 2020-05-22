import React, { Component } from "react";
import { Text, View, StyleSheet, Picker, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import storageHelper from "../shared/helpers/storage";

export class Create extends Component {
  mode = "date";
  state = {
    dueDate: new Date(),
    invoiceType: "rent",
    reoccuring: false,
  };

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
    storageHelper.setInvoiceToStorage(this.state).then(success => {
      if (success) {

      }
      else {
        
      }
    });
  };

  render() {
    const { dueDate } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>Lägg till ny faktura</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Företag / organisation"
              autoCapitalize="words"
              maxLength={50}
              returnKeyType="next"
              clearButtonMode="while-editing"
              onBlur={(res) => this.saveValue(res.nativeEvent.text, "company")}
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
              returnKeyType="next"
              clearButtonMode="while-editing"
              onBlur={(res) => this.saveValue(res.nativeEvent.text, "amount")}
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
              checked={this.state.reoccuring}
              onPress={() =>
                this.setState({ reoccuring: !this.state.reoccuring })
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
