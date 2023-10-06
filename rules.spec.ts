import { BuyXGetYPercentOffRule, MemberDiscountRule } from "./rules";
import { SKU } from "./data";

jest.mock('./data', () => ({
  SKU: {
    blue: 'blue',
    green: 'green',
    orange: 'orange',
  },
  MENU: {
    blue: {
      name: 'Blue set',
      unitPrice: 100,
    },
    green: {
      name: 'Green set',
      unitPrice: 200,
    },
    orange: {
      name: 'Orange set',
      unitPrice: 300,
    },
  },
}));

describe('Rules', () => {
  describe('BuyXGetYPercentOffRule', () => {
    describe('match', () => {
      it('should match when sku is in the list and amount is more than buy', () => {
        const rule = new BuyXGetYPercentOffRule(2, 50, [SKU.blue, SKU.green]);
        expect(rule.match(SKU.blue, 2)).toBeTruthy();
      });

      it('should not match when sku is in the list and amount is less than buy', () => {
        const rule = new BuyXGetYPercentOffRule(5, 50, [SKU.blue, SKU.green]);
        expect(rule.match(SKU.green, 2)).toBeFalsy();
      });
    });

    describe('getDiscount', () => {
      it('should return correct discount', () => {
        const rule = new BuyXGetYPercentOffRule(2, 25, [SKU.blue, SKU.green]);
        expect(rule.getDiscount(SKU.green, 2)).toEqual(-100);
      });

      it('should return correct discount when it not match rule', () => {
        const rule = new BuyXGetYPercentOffRule(2, 25, [SKU.blue, SKU.green]);
        expect(rule.getDiscount(SKU.orange, 2)).toEqual(0);
      });
    });
  });

  describe('MemberDiscountRule', () => {
    describe('getDiscount', () => {
      it('should return correct discount when apply member', () => {
        const rule = new MemberDiscountRule(10);
        expect(rule.getDiscount(1000, true)).toEqual(-100);
      });

      it('should return correct discount when not a member', () => {
        const rule = new MemberDiscountRule(10);
        expect(rule.getDiscount(1000, false)).toEqual(0);
      });
    });
  });
});
