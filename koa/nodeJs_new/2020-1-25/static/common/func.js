const fileDictionary = new Map([
    { '.html': 'text/html' },
    { '.css': 'text/css' },
    { '.js': 'text/javascript' },
])

function getName(extname) {
    let content = fileDictionary.get(extname);
    content = content ? content : fileDictionary.get('.html');
    return content;
}

exports.getName = getName;