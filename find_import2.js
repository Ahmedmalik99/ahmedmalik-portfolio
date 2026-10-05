els = document.querySelectorAll('button, a, [role="button"]')
matches = []
for (let el of els) {
    if (el.textContent && el.textContent.includes('Import') && el.textContent.includes('ahmedmalik-portfolio')) {
        matches.push(el)
    }
}
if (matches.length > 0) {
    let el = matches[0]
    console.log('Found:', el.outerHTML)
    let rect = el.getBoundingClientRect()
    console.log('Rect:', rect.x, rect.y, rect.width, rect.height)
} else {
    console.log('Not found')
}