result = js("""
Array.from(document.querySelectorAll('button'))
  .map(e => ({text: e.textContent.trim(), html: e.outerHTML.substring(0,200)}))
  .filter(e => e.text.includes('Import'))
""")
print(result)