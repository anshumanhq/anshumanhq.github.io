// Shared loader function for projects, certificates, and research
document.addEventListener('DOMContentLoaded', function() {
    // Detect which page we're on by checking element IDs
    const projectContainer = document.getElementById('projects-grid');
    const certContainer = document.getElementById('certificates-grid');
    const researchContainer = document.getElementById('research-grid');

    // Function to create a project card
    function renderProject(proj) {
        return `
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden card-hover transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div class="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.style.display='none'">
                    <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                        ${proj.category || 'Project'}
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${proj.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">${proj.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${proj.tech.map(t => `<span class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">${t}</span>`).join('')}
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex space-x-3">
                            ${proj.live ? `<a href="${proj.live}" target="_blank" class="text-primary dark:text-blue-400 font-semibold text-sm hover:underline">Live Demo →</a>` : ''}
                            ${proj.github ? `<a href="${proj.github}" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 text-sm"><i class="fab fa-github"></i> Code</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderCertificate(cert) {
        return `
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden card-hover transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl p-6">
                <div class="flex items-center gap-4 mb-4">
                    <img src="${cert.image}" alt="${cert.issuer}" class="w-12 h-12 object-contain" loading="lazy" onerror="this.style.display='none'">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">${cert.name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${cert.issuer}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>📅 ${cert.date}</span>
                    ${cert.credential_id ? `<span class="font-mono text-xs">ID: ${cert.credential_id}</span>` : ''}
                </div>
                <div class="flex flex-wrap gap-2">
                    ${cert.skills.map(s => `<span class="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">${s}</span>`).join('')}
                </div>
            </div>
        `;
    }

    function renderResearch(paper) {
        return `
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden card-hover transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div class="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img src="${paper.image}" alt="${paper.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.style.display='none'">
                    <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                        ${paper.type} · ${paper.year}
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${paper.title}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">${paper.authors} · ${paper.journal}</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">${paper.abstract}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${paper.tags.map(t => `<span class="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">#${t}</span>`).join('')}
                    </div>
                    <a href="${paper.url}" target="_blank" class="text-primary dark:text-blue-400 font-semibold text-sm hover:underline inline-flex items-center">
                        Read Paper <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        `;
    }

    // Load Projects
    if (projectContainer) {
        fetch('data/projects.json')
            .then(res => res.json())
            .then(data => {
                projectContainer.innerHTML = data.map(renderProject).join('');
            })
            .catch(err => {
                projectContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center col-span-full">Failed to load projects. Please try again later.</p>`;
                console.error(err);
            });
    }

    // Load Certificates
    if (certContainer) {
        fetch('data/certificates.json')
            .then(res => res.json())
            .then(data => {
                certContainer.innerHTML = data.map(renderCertificate).join('');
            })
            .catch(err => {
                certContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center col-span-full">Failed to load certificates.</p>`;
                console.error(err);
            });
    }

    // Load Research
    if (researchContainer) {
        fetch('data/research.json')
            .then(res => res.json())
            .then(data => {
                researchContainer.innerHTML = data.map(renderResearch).join('');
            })
            .catch(err => {
                researchContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center col-span-full">Failed to load research papers.</p>`;
                console.error(err);
            });
    }
});