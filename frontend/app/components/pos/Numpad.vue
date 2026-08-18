<template>
  <div class="numpad">
    <div class="row">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
    <div class="row">
      <button>4</button>
      <button>5</button>
      <button>6</button>
    </div>
    <div class="row">
      <button>7</button>
      <button>8</button>
      <button>9</button>
    </div>
    <div class="row">
      <button>C</button>
      <button>0</button>
      <button>OK</button>
    </div>
  </div>
</template>

<style scoped>
.numpad {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}
.row {
  display: flex;
  gap: 0.5rem;
}
button {
  flex: 1;
  padding: 1rem;
  font-size: 1.2rem;
  background: #f1f2f6;
  border: 1px solid #dfe4ea;
  border-radius: 4px;
  cursor: pointer;
}
button:active {
  background: #dfe4ea;
}
</style>
