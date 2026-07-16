document.addEventListener('DOMContentLoaded', function() {
    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projectsList');
            if (!container) return;
            projects.forEach(proj => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                    <div class="project-tags">
                        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    ${proj.commercial ? '<span class="commercial-badge">💰 Commercial</span>' : ''}
                    <div style="margin-top:12px;">
                        ${proj.github ? `<a href="${proj.github}" target="_blank" class="btn btn-sm btn-outline">GitHub →</a>` : ''}
                        ${proj.live ? `<a href="${proj.live}" target="_blank" class="btn btn-sm btn-primary">Live Demo →</a>` : ''}
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});
