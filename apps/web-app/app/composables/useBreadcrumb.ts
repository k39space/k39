import type { BreadcrumbItem } from '@nuxt/ui'

function _useBreadcrumb() {
  const items = ref<BreadcrumbItem[]>([])

  function setItems(newItems: BreadcrumbItem[]) {
    items.value = newItems
  }

  return {
    items,
    setItems,
  }
}

export const useBreadcrumb = createSharedComposable(_useBreadcrumb)
