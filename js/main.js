(async function () {
    addPoem(await getNum());
})();

async function getNum() {
    return await fetch('settings/config.json')
        .then(cfg => cfg.json())
        .then(cfg => Math.round(Math.random() * (cfg.amount - 1)));
}

function addPoem(num) {
    const poemBlock = document.querySelector('.poem');

    fetch(`poems/${num}.json`)
        .then(poem => poem.json())
        .then(poem => {
            poem.content.forEach(block => {
                const p = document.createElement('p');
                let text = '';
    
                block.forEach(str => {
                    text += str + '<br>' + '\n'; 
                });
    
                p.innerHTML = text;
    
                poemBlock.appendChild(p);
            });
    
            const p = document.createElement('p');
    
            p.innerHTML = poem.author;
            p.className = 'author';
    
            poemBlock.appendChild(p);
        });
}