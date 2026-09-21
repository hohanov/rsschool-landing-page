const switcher = document.querySelector('#theme-switcher')
const doc = document.documentElement

const themes = ['auto', 'light', 'dark']

const setTheme = theme => {
  doc.setAttribute('color-scheme', theme)
  switcher.dataset.theme = theme
  localStorage.setItem('theme', theme)
}

const savedTheme = localStorage.getItem('theme') || 'auto'
setTheme(savedTheme)

switcher.addEventListener('click', () => {
  const current = switcher.dataset.theme
  const next = themes[(themes.indexOf(current) + 1) % themes.length]

  setTheme(next)
})