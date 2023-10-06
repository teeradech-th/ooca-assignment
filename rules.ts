/**
 * This may seem over engineer for this assignment
 * the purpose of this to show that
 * we should make the rules as dynamic for flexibility
 */

import { MENU, SKU } from './data';

interface ItemRule {
  match(sku: SKU, amount: number): boolean;
  getDiscount(sku: SKU, amount: number): number;
}

class BuyXGetYPercentOffRule implements ItemRule {
  constructor(private buy: number, private percentOff: number, private sku: SKU[]) {
  }

  match(sku: SKU, amount: number): boolean {
    return this.sku.includes(sku) && amount >= this.buy;
  }

  getDiscount(sku: SKU, amount: number): number {
    return this.match(sku, amount) ? MENU[sku].unitPrice * amount * this.percentOff / 100 * -1 : 0;
  }
}

interface BillRule {
  getDiscount(totalAmount: number, ...options: any[]): number;
}

class MemberDiscountRule implements BillRule {
  constructor(private memberDiscountPercent: number) {
  }

  getDiscount(totalAmount: number, isMember: boolean): number {
    return isMember ? totalAmount * this.memberDiscountPercent / 100 * -1 : 0;
  }
}

export {
  ItemRule,
  BuyXGetYPercentOffRule,
  BillRule,
  MemberDiscountRule,
}
