export const CELLSLIST = 'cellsList'

export function cellsList() {
  return {
    type: CELLSLIST,
    meta: {
      isHc: true,
      namespace: 'cells'
    }
  }
}
