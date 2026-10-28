
const test = require("node:test");
const assert = require("node:assert/strict");

// A basic test for the sample product catalogue.
test("sample product catalogue has four products", () => {
  const products = [
    { id: 1, name: "T-Shirt", price: 499 },
    { id: 2, name: "Shoes", price: 1299 },
    { id: 3, name: "Backpack", price: 799 },
    { id: 4, name: "Watch", price: 999 }
  ];

  assert.equal(products.length, 4);
  assert.ok(products.every(p => p.price > 0));
});
