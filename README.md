# OOCA Assignment

Due to assignment was not clear for some use cases this assignment was assume additional rules.

- Member discount will be calculated discount on top of item discount
- Items discount cannot count across SKU group (ie. 1 Orange and 1 Pink will be not eligible for discount)

## To run

```bash
npm install
npm run start
```

## To Test

```bash
npm run test
```

## Test Result

- PASS  ./calculator.spec.ts
  - Calculator
  - addItem
    - ✓ should add item to bill with amount (1 ms)
    - ✓ should add item to bill without amount (1 ms)
    - ✓ should be able to add multiple items
  - bill
    - ✓ should discount on orange set when order is 2
    - ✓ should discount on orange set when order is 3
    - ✓ should discount on orange set when order is 2 and using member discount
- PASS  ./rules.spec.ts
  - Rules
    - BuyXGetYPercentOffRule
      - match
        - ✓ should match when sku is in the list and amount is more than buy
        - ✓ should not match when sku is in the list and amount is less than buy
      - getDiscount
        - ✓ should return correct discount
        - ✓ should return correct discount when it not match rule (1 ms)
    - MemberDiscountRule
      - getDiscount
        - ✓ should return correct discount when apply member
        - ✓ should return correct discount when not a member

| File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| -------------- | -------:| --------:| -------:| -------:| ----------------- |
| All files      |     100 |      100 |     100 |     100 | |
|  calculator.ts |     100 |      100 |     100 |     100 | |
|  data.ts       |     100 |      100 |     100 |     100 | |
|  rules.ts      |     100 |      100 |     100 |     100 | |

- Test Suites: 2 passed, 2 total
- Tests:       12 passed, 12 total
- Snapshots:   0 total
- Time:        0.501 s, estimated 1 s
- Ran all test suites.
