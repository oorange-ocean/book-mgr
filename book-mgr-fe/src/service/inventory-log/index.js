import { del, post, get } from '@/helpers/request'

export const list = (type = 'IN_COUNT',) => {
  return get(
    '/inventory-log/list', {

    type,

  }
  )
}