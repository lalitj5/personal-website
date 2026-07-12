(function () {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');
    const gridProjects = document.getElementById('grid-projects');
    const gridWriting = document.getElementById('grid-writing');

    const previewPanel = document.querySelector('.preview-panel');
    const previewBackdrop = document.querySelector('.preview-backdrop');
    const previewClose = document.querySelector('.preview-close');
    const recentWorkCard = document.getElementById('recent-work-card');
    const previewImage = document.querySelector('.preview-image');
    const previewMeta = document.querySelector('.preview-meta');
    const previewTitle = document.querySelector('.preview-title');
    const previewDescription = document.querySelector('.preview-description');
    const previewLink = document.querySelector('.preview-link');
    const previewEmbedContainer = document.getElementById('preview-embed-container');
    const portraitFrames = Array.from(document.querySelectorAll('.portrait'));
    const portraitColumn = document.querySelector('.portrait-column');

    let activeTab = 'projects';
    let lastFocusedElement = null;
    let currentPortraitIndex = 0;

    function showRandomPortrait() {
        portraitFrames.forEach(function (frame) {
            frame.classList.remove('is-active');
        });
        
        let randomIndex = 0;
        while (currentPortraitIndex == randomIndex) {
            randomIndex = Math.floor(Math.random() * portraitFrames.length);
        }

        portraitFrames[randomIndex].classList.add('is-active');
        currentPortraitIndex = randomIndex;
    }

    if (portraitFrames[0]) {
        portraitFrames[0].classList.add('is-active');
    }

    if (portraitColumn) {
        portraitColumn.addEventListener('mouseenter', showRandomPortrait);
    }

    function renderCards(container, items, type) {
        container.innerHTML = '';

        items.forEach(function (item) {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'card';
            card.dataset.id = item.id;
            card.dataset.type = type;

            const title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = item.title;

            const teaser = document.createElement('p');
            teaser.className = 'card-teaser';
            teaser.textContent = item.teaser;

            card.appendChild(title);
            card.appendChild(teaser);

            if (item.tags && item.tags.length) {
                const meta = document.createElement('p');
                meta.className = 'card-meta';
                meta.textContent = item.tags.join(' · ');
                card.appendChild(meta);
            } else if (item.date) {
                const meta = document.createElement('p');
                meta.className = 'card-meta';
                meta.textContent = formatDate(item.date);
                card.appendChild(meta);
            }

            card.addEventListener('click', function () {
                openPreview(item, type);
            });

            container.appendChild(card);
        });
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function renderRecentWorkCard(repo, commitMessage) {
        recentWorkCard.innerHTML = '';

        const title = document.createElement('a');
        title.className = 'recent-work-title';
        title.href = repo.html_url;
        title.target = '_blank';
        title.rel = 'noopener noreferrer';
        title.textContent = repo.name + "  •     Last Commit - " + commitMessage;
        
        const description = document.createElement('p');
        description.className = 'recent-work-description';
        description.textContent = repo.description || 'Open the repository to see what I’ve been building.';

        const meta = document.createElement('div');
        meta.className = 'recent-work-meta';

        const updated = document.createElement('span');
        updated.textContent = 'Updated ' + new Date(repo.updated_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        meta.appendChild(updated);

        if (repo.language) {
            const language = document.createElement('span');
            language.textContent = '• ' + repo.language;
            meta.appendChild(language);
        }

        const link = document.createElement('a');
        link.className = 'recent-work-link';
        link.href = repo.html_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Open on GitHub';

        recentWorkCard.appendChild(title);
        recentWorkCard.appendChild(description);
        recentWorkCard.appendChild(meta);
        recentWorkCard.appendChild(link);
    }

    function renderRecentWorkError(message) {
        recentWorkCard.innerHTML = '';

        const fallback = document.createElement('p');
        fallback.className = 'recent-work-empty';
        fallback.textContent = message;

        const link = document.createElement('a');
        link.className = 'recent-work-link';
        link.href = 'https://github.com/lalitj5';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Visit my GitHub';

        recentWorkCard.appendChild(fallback);
        recentWorkCard.appendChild(link);
    }

    async function loadRecentWork() {
        try {
            const response = await fetch('https://api.github.com/users/lalitj5/repos?sort=updated&direction=desc&per_page=5');

            if (!response.ok) {
                throw new Error('I couldn’t reach GitHub right now, but my profile is still available.');
            }

            const repos = await response.json();
            // console.log(repos)
            const repo = repos.find(function (item) {
                return !item.fork;
            }) ||  repos[0];

            if (!repo) {
                throw new Error('No repositories were found for this GitHub account.');
            }

            const commitResponse = await fetch(`https://api.github.com/repos/lalitj5/${repo.name}/commits?per_page=1`);
            if (!commitResponse.ok) throw new Error('Could not fetch latest commit.');

            const commits = await commitResponse.json();
            const latestCommit = commits[0];

            const commitMessage  = latestCommit.commit.message;
            // console.log("Latest Commit Message:", commitMessage);

            renderRecentWorkCard(repo, commitMessage);
        } catch (error) {
            renderRecentWorkError(error.message);
        }
    }

    function switchTab(tabName) {
        activeTab = tabName;

        tabs.forEach(function (tab) {
            const isActive = tab.id === 'tab-' + tabName;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            tab.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(function (panel) {
            const isActive = panel.id === 'panel-' + tabName;
            panel.hidden = !isActive;
        });
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            const tabName = tab.id.replace('tab-', '');
            switchTab(tabName);
        });

        tab.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const nextTab = event.key === 'ArrowRight' ? 'writing' : 'projects';
                switchTab(nextTab);
                document.getElementById('tab-' + nextTab).focus();
            }
        });
    });

    function openPreview(item, type) {
        lastFocusedElement = document.activeElement;

        previewTitle.textContent = item.title;
        previewDescription.textContent = item.description;

        if (type === 'projects' && item.tags && item.tags.length) {
            previewMeta.textContent = item.tags.join(' · ');
            previewMeta.hidden = false;
        } else if (type === 'writing' && item.date) {
            previewMeta.textContent = formatDate(item.date);
            previewMeta.hidden = false;
        } else {
            previewMeta.hidden = true;
        }

        previewImage.src = item.previewImage || '';
        previewImage.alt = 'Preview of ' + item.title;

        // Clear any previous embed frame first
        if (typeof previewEmbedContainer !== 'undefined') {
            previewEmbedContainer.innerHTML = '';
            previewEmbedContainer.style.display = 'none';
        }

        if (type === 'writing') {
            previewOverleafLink.href = item.url;
            previewOverleafLink.textContent = 'Read article';
            previewOverleafLink.style.display = 'inline-block';
            previewGitHubLink.style.display = 'none';
        } else if (type === 'projects') {
            previewOverleafLink.textContent = 'Open Paper';

            if (item.github_url) {
                previewGitHubLink.href = item.github_url;
                previewGitHubLink.style.display = 'inline-block';
            } else {
                previewGitHubLink.style.display = 'none';
            }

            if (item.overleaf_url) {
                previewOverleafLink.href = item.overleaf_url;
                previewOverleafLink.style.display = 'inline-block';

                if (typeof previewEmbedContainer !== 'undefined') {
                    const iframe = document.createElement('iframe');
                    iframe.src = item.overleaf_url;
                    iframe.title = 'Embedded view of ' + item.title;
                    iframe.style.width = '100%';
                    iframe.style.height = '500px'; // Adjust height as needed
                    iframe.style.border = 'none';
                    iframe.style.marginTop = '1.5rem';
                    
                    previewEmbedContainer.appendChild(iframe);
                    previewEmbedContainer.style.display = 'block';
                }
            } else {
                previewOverleafLink.style.display = 'none';
            }
        }

        previewPanel.classList.add('is-open');
        previewPanel.setAttribute('aria-hidden', 'false');
        previewBackdrop.hidden = false;
        document.body.classList.add('panel-open');

        previewClose.focus();
    }

    function closePreview() {
        previewPanel.classList.remove('is-open');
        previewPanel.setAttribute('aria-hidden', 'true');
        previewBackdrop.hidden = true;
        document.body.classList.remove('panel-open');

        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    previewClose.addEventListener('click', closePreview);
    previewBackdrop.addEventListener('click', closePreview);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && previewPanel.classList.contains('is-open')) {
            closePreview();
        }
    });

    renderCards(gridProjects, portfolio.projects, 'projects');
    renderCards(gridWriting, portfolio.writing, 'writing');
    loadRecentWork();
})();
