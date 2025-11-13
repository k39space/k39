import type { CreatePageReviewClientSchema } from '../utils/review'

function _usePageReview() {
  const state = ref<Partial<CreatePageReviewClientSchema>>({
    rating: undefined,
    pros: undefined,
    cons: undefined,
    comment: undefined,
    photos: [],
  })

  const list = computed(() => [
    {
      label: 'Поставить общую оценку',
      completed: state.value.rating !== undefined,
      weight: 20,
    },
    {
      label: 'Указать достоинства',
      completed: state.value.pros !== undefined && state.value.pros !== '',
      weight: 20,
    },
    {
      label: 'Указать недостатки',
      completed: state.value.cons !== undefined && state.value.cons !== '',
      weight: 20,
    },
    {
      label: 'Написать развернутый комментарий',
      completed: state.value.comment !== undefined && state.value.comment !== '',
      weight: 20,
    },
    {
      label: 'Добавить фото',
      completed: state.value.photos && state.value.photos.length > 0,
      weight: 20,
    },
  ])

  const maxWeight = 100

  const progress = computed<number>(() => {
    const weight = list.value.reduce((acc, item) => item.completed ? acc + item.weight : acc, 0)
    return (weight / maxWeight) * 100
  })

  return {
    state,
    progress,
    list,
  }
}

export const usePageReview = createSharedComposable(_usePageReview)
