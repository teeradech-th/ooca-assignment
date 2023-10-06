import { Calculator } from "./calculator";
import { SKU } from "./data";

const bill1 = new Calculator();
bill1.addItem(SKU.orange, 2);
bill1.addItem(SKU.red, 1);
bill1.addItem(SKU.blue, 1);
console.log(bill1.printBill({ isMember: false }));
console.log(bill1.bill({ isMember: false }));
