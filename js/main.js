(async function () {
    add(await getNum());
})();

async function getNum() {
    return await fetch('settings/config.json')
        .then(cfg => cfg.json())
        .then(cfg => Math.floor(Math.random() * cfg.amount));
}

function add(num) {
    fetch(`poems/${num}.json`)
        .then(poem => poem.json())
        .then(poem => {
            const block = document.querySelector('.poem');

            addPoem(block, poem);
            addAuthor(block, poem);
        });
}

function addPoem(block, {content}) {
    content.forEach(stanza => {
        const p = document.createElement('p');
        let text = '';

        stanza.forEach(str => {
            text += str + '<br>' + '\n'; 
        });

        p.innerHTML = text;

        block.appendChild(p);
    });
}

function addAuthor(block, {author}) {
    const p = document.createElement('p');
    
    p.innerHTML = author;
    p.className = 'author';

    block.appendChild(p);
}