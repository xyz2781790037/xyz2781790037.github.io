(() => {
  const header = document.querySelector('#page-header.full_page')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection && navigator.connection.saveData

  if (!header || reduceMotion || saveData) return

  const video = document.createElement('video')
  video.className = 'hero-video'
  video.src = '/media/hero-web.mp4'
  video.autoplay = true
  video.defaultMuted = true
  video.muted = true
  video.loop = true
  video.playsInline = true
  video.preload = 'metadata'
  video.tabIndex = -1
  video.setAttribute('aria-hidden', 'true')
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')

  const revealVideo = () => {
    video.classList.add('is-ready')
    video.play().catch(() => {})
  }

  video.addEventListener('canplay', revealVideo, { once: true })
  video.addEventListener('error', () => video.remove(), { once: true })
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause()
    } else {
      video.play().catch(() => {})
    }
  })

  header.prepend(video)
})()
