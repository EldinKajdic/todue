import { AsyncStorage } from "react-native";

const storageHelper = {
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

    let invoice = {
      company: item.company,
      amount: item.amount,
      currency: "kr",
      isPaid: false,
      dueDate: item.dueDate,
      invoiceType: item.invoiceType,
    };

    await this.getInvoicesFromStorage().then((invoices) => {
      console.log(invoices);
      if (invoices !== null) {
        invoiceArray = invoices;
        console.log(invoiceArray);
      }
    });

    console.log(invoiceArray);
    invoiceArray.push(invoice);
    console.log("----------");
    console.log(invoiceArray);

    try {
      await AsyncStorage.setItem("invoices", JSON.stringify(invoiceArray));
    } catch (error) {
      console.log(error);
    }
  },
};

export default storageHelper;
