import { Calculator } from "./calculator";
import { SKU } from "./data";
import * as Rules from "./rules";
describe('Calculator', () => {
  describe('addItem', () => {
    it('should add item to bill with amount', () => {
      const bill = new Calculator();
      bill.addItem(SKU.red, 2);
      expect(bill.items[SKU.red].amount).toBe(2);
    });

    it('should add item to bill without amount', () => {
      const bill = new Calculator();
      bill.addItem(SKU.red);
      expect(bill.items[SKU.red].amount).toBe(1);
    });

    it('should be able to add multiple items', () => {
      const bill = new Calculator();
      bill.addItem(SKU.red);
      bill.addItem(SKU.green, 2);
      expect(bill.items[SKU.red].amount).toBe(1);
      expect(bill.items[SKU.green].amount).toBe(2);
    });
  });

  describe('bill', () => {
    it('should discount on orange set when order is 2', () => {
      const bill = new Calculator();
      bill.addItem(SKU.orange, 2);
      expect(bill.bill()).toEqual(228);
    });

    it('should discount on orange set when order is 3', () => {
      const bill = new Calculator();
      bill.addItem(SKU.orange, 3);
      expect(bill.bill()).toEqual(342);
    });

    it('should discount on orange set when order is 2 and using member discount', () => {
      const bill = new Calculator();
      bill.addItem(SKU.orange, 2);
      expect(bill.bill({ isMember: true })).toEqual(205.2);
    });
  });
});
