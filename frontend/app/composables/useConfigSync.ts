import { ref, onMounted, onUnmounted } from 'vue'

export const useConfigSync = () => {
  const ticketRates = ref<any[]>([])
  const rides = ref<any[]>([])
  let eventSource: EventSource | null = null

  const fetchTickets = async () => {
    try {
      const data = await $fetch<any[]>('http://localhost:3001/api/v1/config/tickets')
      ticketRates.value = data.map(t => ({
        ...t,
        imageUrl: t.imageUrl ? (t.imageUrl.startsWith('http') ? t.imageUrl : `http://localhost:3001${t.imageUrl}`) : ''
      }))
    } catch (err) {
      console.error('Failed to fetch tickets:', err)
    }
  }

  const fetchRides = async () => {
    try {
      const data = await $fetch<any[]>('http://localhost:3001/api/v1/config/rides')
      rides.value = data.map(t => ({
        ...t,
        imageUrl: t.imageUrl ? (t.imageUrl.startsWith('http') ? t.imageUrl : `http://localhost:3001${t.imageUrl}`) : ''
      }))
    } catch (err) {
      console.error('Failed to fetch rides:', err)
    }
  }

  const setupSSE = () => {
    eventSource = new EventSource('http://localhost:3001/api/v1/config/events')

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data)
        if (payload.type === 'ticket-updated') {
          fetchTickets()
        } else if (payload.type === 'ride-updated') {
          fetchRides()
        }
      } catch (err) {
        console.error('Error parsing SSE event', err)
      }
    }

    eventSource.onerror = (err) => {
      console.error('SSE connection error. Reconnecting...', err)
      eventSource?.close()
      setTimeout(setupSSE, 5000) // reconnect after 5s
    }
  }

  onMounted(() => {
    fetchTickets()
    fetchRides()
    setupSSE()
  })

  onUnmounted(() => {
    if (eventSource) {
      eventSource.close()
    }
  })

  return {
    ticketRates,
    rides,
    fetchTickets,
    fetchRides
  }
}
