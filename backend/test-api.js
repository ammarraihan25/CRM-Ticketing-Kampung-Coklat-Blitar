async function test() {
  const url = 'http://localhost:3001/api/v1/config/tickets';
  const getRes = await fetch(url);
  const tickets = await getRes.json();
  const ticket = tickets.find(t => t.name.includes('Tiket Reguler'));
  
  if (!ticket) {
    console.log('Tiket Reguler not found', tickets.map(t => t.name));
    return;
  }
  
  console.log('Testing PUT for id', ticket.id);
  const payload = {
    name: ticket.name,
    category: ticket.category,
    price: 25000,
    description: ticket.description,
    isActive: ticket.isActive,
    imageUrl: ticket.imageUrl
  };
  
  console.log('Payload:', payload);
  const putRes = await fetch(`${url}/${ticket.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  const text = await putRes.text();
  console.log('PUT Status:', putRes.status);
  console.log('PUT Response:', text);
}
test().catch(console.error);
