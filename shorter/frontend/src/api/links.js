import apiClient from './client'

export async function shortenUrl(url) {
  const response = await apiClient.post('/api/shorten', { url })
  return response.data
}
