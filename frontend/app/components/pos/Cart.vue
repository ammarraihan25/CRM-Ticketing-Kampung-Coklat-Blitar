<template>
  <div class="cart">
    <ul class="cart-items">
      <li>
        <span>Tiket Reguler x 2</span>
        <span>Rp 40.000</span>
      </li>
    </ul>
    <div class="cart-total">
      <strong>Total: Rp 40.000</strong>
    </div>
    <SharedBaseButton text="Checkout" class="checkout-btn" />
  </div>
</template>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.cart-items {
  list-style: none;
  padding: 0;
  flex: 1;
}
.cart-items li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #ccc;
}
.cart-total {
  font-size: 1.2rem;
  text-align: right;
  margin-bottom: 1rem;
}
.checkout-btn {
  width: 100%;
  background-color: #27ae60;
  color: white;
  padding: 1rem;
}
</style>
