document.addEventListener('DOMContentLoaded', function() {
    fetch('data/research.json')
        .then(response => response.json())
        .then(research => {
            const container = document.getElementById('researchList');
            if (!container) return;
            research.forEach(item => {
                const card = document.createElement('div');
                card.className = 'research-card';
                card.innerHTML = `
                    <div class="research-meta">
                        <span class="research-year">${item.year}</span>
                        <span class="research-type">${item.type}</span>
                    </div>
                    <h3>${item.title}</h3>
                    <p class="research-authors">${item.authors}</p>
                    <p class="research-journal">${item.journal}</p>
                    <p class="research-abstract">${item.abstract}</p>
                    <div class="research-tags">
                        ${item.tags.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <a href="${item.url}" target="_blank" class="btn btn-sm btn-primary">Read Paper →</a>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading research:', error));
});
