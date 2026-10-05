ax = cdp('Accessibility.getFullAXTree')
nodes = ax['nodes']
matches = []
for n in nodes:
    name = n.get('name', '')
    if name and isinstance(name, str):
        lname = name.lower()
        if 'import' in lname or 'github' in lname or 'repo' in lname or 'continue' in lname:
            matches.append((n.get('backendDOMNodeId'), name))
print(matches[:15])