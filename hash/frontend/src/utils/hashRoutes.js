import { pageLabels } from '../constants/pages'

export function getPageFromHashPath(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  const pageIndex = parts.indexOf('page')
  const page = pageIndex >= 0 ? parts[pageIndex + 1] : ''

  if (parts.includes('server') && pageLabels[page]) {
    return page
  }

  return null
}
