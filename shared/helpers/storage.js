import { AsyncStorage } from "react-native";

const storageHelper = {
  reset() {
    AsyncStorage.clear();
  },
  async getInvoicesFromStorage() {
    try {
      let invoices = await AsyncStorage.getItem("invoices");
      return invoices == null ? null : JSON.parse(invoices);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async setInvoiceToStorage(item) {
    var invoiceArray = [];
    var id = this.generateUuid();

    let invoice = {
      id: id,
      company: item.company,
      amount: item.amount,
      currency: "kr",
      isPaid: false,
      dueDate: item.dueDate,
      invoiceType: item.invoiceType,
    };

    await this.getInvoicesFromStorage().then((invoices) => {
      if (invoices !== null) {
        invoiceArray = invoices;
      }
    });

    invoiceArray.push(invoice);

    try {
      await AsyncStorage.setItem("invoices", JSON.stringify(invoiceArray));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async deleteItemFromStorage(id) {
    var invoiceArray = [];
    await this.getInvoicesFromStorage().then((invoices) => {
      if (invoices !== null) {
        invoiceArray = invoices.filter((inv) => inv.id !== id);
      }
    });
    try {
      await AsyncStorage.setItem("invoices", JSON.stringify(invoiceArray));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async setIsPaid(id, val) {
    var invoiceArray = [];
    await this.getInvoicesFromStorage().then((invoices) => {
      if (invoices !== null) {
        console.log(id);
        invoices.find((inv) => inv.id == id).isPaid = val;
      }
      invoiceArray = invoices;
    });
    try {
      await AsyncStorage.setItem("invoices", JSON.stringify(invoiceArray));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  generateUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};

export default storageHelper;
