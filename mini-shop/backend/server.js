
const express = require("express");

const app = express();
const PORT = 5000;

// Allow Express to read JSON request bodies.
app.use(express.json());

// Sample products stored in memory.
// They reset when the backend restarts.
const products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Shoes", price: 1299 },
  { id: 3, name: "Backpack", price: 799 },
  { id: 4, name: "Watch", price: 999 }
];

// Home route to confirm that the backend is running.
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Mini Shop API is running" });
});

// Return all available products.
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Receive a demo order from the frontend.
// This example does not charge money or save orders.
app.post("/api/orders", (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Please add a product before checkout."
    });
  }

  // Validate product IDs and quantities on the server.
  let total = 0;

  for (const item of items) {
    const product = products.find(p => p.id === Number(item.id));
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) ||
        quantity < 1 || quantity > 100) {
      return res.status(400).json({
        message: "Invalid product or quantity."
      });
    }

    total += product.price * quantity;
  }

  res.status(201).json({
    message: "Demo order placed successfully!",
    total: total
  });
});

// Listen on all container network interfaces.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mini Shop API listening on port ${PORT}`);
});
