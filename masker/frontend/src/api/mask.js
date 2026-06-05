import apiClient from './client'

export async function maskUrl(url) {
  const response = await apiClient.post('/api/mask', { url })
  return response.data
}
