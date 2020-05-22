import { AsyncStorage } from "react-native";
import UUIDGenerator from "react-native-uuid-generator";

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
    var id;

    UUIDGenerator.getRandomUUID().then((uuid) => {
      id = uuid;
    });

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
        console.log(invoiceArray);
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
  setIsPaid(id, val) {},
};

export default storageHelper;
