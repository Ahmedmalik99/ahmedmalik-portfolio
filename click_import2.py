result = js("""
Array.from(document.querySelectorAll('a'))
  .filter(e => e.textContent && e.textContent.trim() === 'Import')
  .map(e => {
    let container = e.closest('li, tr, div[class*="repo"], div[class*="project"], article, section')
    let context = container ? container.textContent.trim().substring(0,200) : e.parentElement.textContent.trim().substring(0,200)
    return {href: e.href, context: context}
  })
""")
print(result)