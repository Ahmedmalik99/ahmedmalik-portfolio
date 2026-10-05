result = js("""
Array.from(document.querySelectorAll('button, a, [role="button"]'))
  .filter(e => e.textContent && e.textContent.includes('Import') && e.textContent.includes('ahmedmalik-portfolio'))
  .map(e => {
    let r = e.getBoundingClientRect()
    return {html: e.outerHTML, x: r.x, y: r.y, w: r.width, h: r.height}
  })
""")
print(result)