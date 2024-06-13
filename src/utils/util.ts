export const shuffleArray = (p: Array<any>) => {
  return p.sort(() => {
    return Math.random() - 0.5
  })
}
