import { MENU, SKU } from './data';
import { BuyXGetYPercentOffRule, MemberDiscountRule, ItemRule } from './rules';

type BillItem = Record<SKU, { amount: number }>;

export class Calculator {
  declare itemRules: ItemRule[];
  declare memberDiscountRule: MemberDiscountRule;
  declare items: BillItem;

  constructor() {
    this.itemRules = [new BuyXGetYPercentOffRule(2, 5, [SKU.orange, SKU.pink, SKU.green])];
    this.memberDiscountRule = new MemberDiscountRule(10);
    this.items = <BillItem>{};
  }

  /**
   * 
   * @param sku 
   * @param amount 
   */
  addItem(sku: SKU, amount = 1) {
    if (!this.items[sku]) {
      this.items[sku] = { amount: 0 };
    }
    this.items[sku].amount += amount;
  }

  /**
   * Calculate bill with discount
   * @param param0.isMember boolean
   * @returns number total amount
   */
  bill({ isMember = false }): number {
    let totalAmount = 0;
    Object.entries(this.items).forEach(([sku, { amount }]) => {
      totalAmount += MENU[sku as SKU].unitPrice * amount;

      // Apply item rules
      this.itemRules.forEach(rule => {
        totalAmount += rule.getDiscount(sku as SKU, amount);
      });
    });
    if (isMember) {
      totalAmount += this.memberDiscountRule.getDiscount(totalAmount, isMember);
    }
    return totalAmount;
  }

  /**
   * 
   * @param param0.isMember boolean 
   * @returns string bill for debugging / showing result purpose
   */
  printBill({ isMember = false }): string {
    let bill = ' QTY  ITEM         PRICE      TOTAL';
    bill += '\n===================================';

    let totalAmount = 0;
    Object.entries(this.items).forEach(([sku, { amount }]) => {
      bill += `\n${amount.toString().padStart(4)}  ${MENU[sku as SKU].name.toString().padEnd(12)} ${MENU[sku as SKU].unitPrice.toString().padStart(5)} ${(MENU[sku as SKU].unitPrice * amount).toFixed(2).padStart(10)}`;
      totalAmount += MENU[sku as SKU].unitPrice * amount;

      // Apply item rules
      this.itemRules.forEach(rule => {
        const discount = rule.getDiscount(sku as SKU, amount);
        if (discount < 0) {
          bill += `\n        Discount${discount.toFixed(2).padStart(19)}`;
          totalAmount += discount;
        }
      });
    });

    //Check member discount
    bill += '\n-----------------------------------';
    if (isMember) {
      const discount = this.memberDiscountRule.getDiscount(totalAmount, isMember);
      if (discount < 0) {
        bill += `\nMember Discount${discount.toFixed(2).padStart(20)}`;
        totalAmount += discount;
      }
    }

    //Total
    bill += `\nTotal${totalAmount.toFixed(2).padStart(30)}`;
    bill += '\n===================================';
    return bill;
  }
}
