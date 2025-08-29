export default function handleScroll() {
  const targetElement = document.querySelector(`.scroll`)
  const handleWheel = (e) => {
    targetElement.scrollTop += e.deltaY
    e.preventDefault()
  }

  document.addEventListener('wheel', handleWheel, { passive: false })

  return () => document.removeEventListener('wheel', handleWheel)
}
