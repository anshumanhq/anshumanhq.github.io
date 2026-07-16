document.addEventListener('DOMContentLoaded', function() {
    fetch('data/certificates.json')
        .then(response => response.json())
        .then(certificates => {
            const container = document.getElementById('certificatesList');
            if (!container) return;
            certificates.forEach(cert => {
                const card = document.createElement('div');
                card.className = 'certificate-card';
                card.innerHTML = `
                    <h3>${cert.name}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date">${cert.date}</p>
                    ${cert.credential_id ? `<p class="cert-id">ID: ${cert.credential_id}</p>` : ''}
                    <div class="cert-skills">
                        ${cert.skills.map(s => `<span>${s}</span>`).join('')}
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading certificates:', error));
});
