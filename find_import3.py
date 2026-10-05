result = js("""
Array.from(document.querySelectorAll('[role="button"], button, a, div[onclick]'))
  .filter(e => e.textContent && e.textContent.trim().includes('Import'))
  .map(e => ({text: e.textContent.trim().substring(0,100), tag: e.tagName}))
""")
print(result)