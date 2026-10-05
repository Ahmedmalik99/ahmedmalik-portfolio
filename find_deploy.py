result = js("""
Array.from(document.querySelectorAll('button, a[role="button"]'))
  .filter(e => e.textContent && e.textContent.trim().toLowerCase() === 'deploy')
  .map(e => {
    let r = e.getBoundingClientRect()
    return {text: e.textContent.trim(), tag: e.tagName, x: r.x, y: r.y, w: r.width, h: r.height}
  })
""")
print(result)