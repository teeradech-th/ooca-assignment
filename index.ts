import { Calculator } from "./calculator";
import { SKU } from "./data";

console.log("Bill 1")
const bill1 = new Calculator();
console.log("Add 2 Green set")
bill1.addItem(SKU.green, 2);
console.log("Add 1 Red set")
bill1.addItem(SKU.red, 1);
console.log("Add 1 Blue set")
bill1.addItem(SKU.blue, 1);
console.log("Bill without Member Discount: ", bill1.bill({ isMember: false }))
console.log(bill1.printBill({ isMember: false }));


console.log("\n\nBill 2")
const bill2 = new Calculator();
console.log("Add 2 Pink set")
bill2.addItem(SKU.pink, 2);
console.log("Add 1 Red set")
bill2.addItem(SKU.red, 1);
console.log("Add 1 Pink set")
bill2.addItem(SKU.pink, 1);
console.log("Add 1 Blue set")
bill2.addItem(SKU.blue, 1);
console.log("Bill with Member Discount: ", bill2.bill({ isMember: true }))
console.log(bill2.printBill({ isMember: true }));
