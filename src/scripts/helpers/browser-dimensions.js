export const getWindowHeight = () => {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

export const getDocumentHeight = () => {
  const body = document.body
  const html = document.documentElement

  return Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight)
}

export const getWindowBottom = () => {
  return getDocumentHeight() + getWindowHeight()
}

export const getElementHeight = (el) => {
  return !el ? 0 : (el.offsetHeight || el.clientHeight)
}

// Handle scroll-into-view on subsection menu item toggle
export const scrollStaticSubSectionIntoView = (subSectionId = '') => {
  if (subSectionId.length === 0) {
    window.scrollTo(0, 0)
  } else {
    let subSectionEl = document.querySelector(`[data-static-section="${subSectionId}"]`)
    if (subSectionEl !== null) {
      let subSectionOffsetTop = subSectionEl.offsetTop
      let newWindowScroll = subSectionOffsetTop + 300

      window.scrollTo(0, newWindowScroll)
    }
  }
}
