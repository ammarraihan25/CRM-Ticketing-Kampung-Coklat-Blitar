<template>
  <div class="table-container">
    <table class="crm-table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>No WhatsApp</th>
          <th>Domisili</th>
          <th>Tipe Member</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Budi Santoso</td>
          <td>08123456789</td>
          <td>Blitar</td>
          <td>PP</td>
          <td><button>Detail</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}
.crm-table {
  width: 100%;
  border-collapse: collapse;
}
.crm-table th, .crm-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.crm-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}
button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #2980b9;
}
</style>
