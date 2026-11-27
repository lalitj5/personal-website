(function () {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');
    const gridProjects = document.getElementById('grid-projects');
    const gridWriting = document.getElementById('grid-writing');
    const portfolioSection = document.querySelector('.portfolio');
    const gridEssays = document.getElementById('grid-essays');
    const gridGallery = document.getElementById('grid-gallery');
    const resumeContent = document.getElementById('resume-content');
    const tabOrder = Array.from(tabs).map(function (t) { return t.id.replace('tab-', ''); });
    const writingSearch = document.getElementById('writing-search');
    const writingViewToggle = document.getElementById('writing-view-toggle');
    const carouselWriting = document.getElementById('carousel-writing');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = carouselWriting.querySelector('.carousel-arrow-prev');
    const carouselNext = carouselWriting.querySelector('.carousel-arrow-next');

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

    let activeTab = null; // null = home (nothing selected)
    let lastFocusedElement = null;
    let currentPortraitIndex = 0;
    let filteredWriting = portfolio.writing.slice();
    let writingViewMode = 'grid'; // 'grid' | 'carousel'
    let carouselIndex = 0;

    function showRandomPortrait() {
        if (portraitFrames.length < 2) return;
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

    const portraitWrapper = document.querySelector('.portrait-wrapper');
    if (portraitWrapper) {
        portraitWrapper.addEventListener('mouseenter', showRandomPortrait);
    }

    function applyCarouselPositions() {
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        if (!slides.length) return;

        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-center', i === carouselIndex);
        });

        const slideWidth = slides[0].offsetWidth + 16; // 16px = 1rem gap
        const wrapWidth = carouselTrack.parentElement.offsetWidth;
        const offset = (wrapWidth / 2) - (slideWidth / 2) - (carouselIndex * slideWidth);
        carouselTrack.style.transform = 'translateX(' + offset + 'px)';
    }

    function renderCarousel(items) {
        carouselTrack.innerHTML = '';

        if (items.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'writing-search-empty';
            empty.style.padding = '1rem 0';
            empty.textContent = 'No articles match your search.';
            carouselTrack.appendChild(empty);
            return;
        }

        items.forEach(function (item) {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';

            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'card';

            const title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = item.title;

            const teaser = document.createElement('p');
            teaser.className = 'card-teaser';
            teaser.textContent = item.teaser;

            const meta = document.createElement('p');
            meta.className = 'card-meta';
            meta.textContent = formatDate(item.date);

            card.appendChild(title);
            card.appendChild(teaser);
            card.appendChild(meta);

            card.addEventListener('click', function () {
                openPreview(item, 'writing');
            });

            slide.appendChild(card);
            carouselTrack.appendChild(slide);
        });

        requestAnimationFrame(applyCarouselPositions);
    }

    function advanceCarousel(direction) {
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        if (!slides.length) return;
        carouselIndex = (carouselIndex + direction + slides.length) % slides.length;
        applyCarouselPositions();
    }

    function renderWritingGrid(items) {
        filteredWriting = items;
        carouselIndex = 0;

        if (writingViewMode === 'carousel') {
            renderCarousel(items);
            return;
        }

        gridWriting.innerHTML = '';

        if (items.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'writing-search-empty';
            empty.textContent = 'No articles match your search.';
            gridWriting.appendChild(empty);
            return;
        }

        renderCards(gridWriting, items, 'writing');
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

    function animateScrollBy(distance, duration) {
        if (Math.abs(distance) < 1) return;
        const startY = window.scrollY;
        const startTime = performance.now();
        function step(now) {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in-out
            window.scrollTo(0, startY + distance * eased);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function switchTab(tabName) {
        activeTab = tabName;

        if (tabName !== 'writing') {
            writingSearch.value = '';
            if (writingViewMode === 'carousel') {
                writingViewMode = 'grid';
                writingViewToggle.textContent = 'View as Carousel';
                writingViewToggle.classList.remove('is-active');
                writingViewToggle.setAttribute('aria-pressed', 'false');
                gridWriting.hidden = false;
                carouselWriting.hidden = true;
            }
            renderWritingGrid(portfolio.writing);
        }

        tabs.forEach(function (tab) {
            const isActive = tab.id === 'tab-' + tabName;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            tab.tabIndex = (isActive || (!tabName && tab === tabs[0])) ? 0 : -1;
        });

        portfolioSection.hidden = !tabName;

        panels.forEach(function (panel) {
            const isActive = panel.id === 'panel-' + tabName;
            panel.hidden = !isActive;
        });
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            const tabName = tab.id.replace('tab-', '');
            // Clicking the selected tab again deselects it and returns to the home view
            switchTab(tabName === activeTab ? null : tabName);
            if (activeTab) {
                // Scroll half the way to the content, slowly (native smooth scroll can't be slowed)
                const distance = (portfolioSection.getBoundingClientRect().top - 24) / 2;
                animateScrollBy(distance, 1000);
            }
        });

        tab.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const i = tabOrder.indexOf(tabName);
                const step = event.key === 'ArrowRight' ? 1 : -1;
                const nextTab = tabOrder[(i + step + tabOrder.length) % tabOrder.length];
                switchTab(nextTab);
                document.getElementById('tab-' + nextTab).focus();
            }
        });
    });

    function openPreview(item, type) {
        lastFocusedElement = document.activeElement;

        previewTitle.textContent = item.title || '';
        previewDescription.textContent = item.description || item.caption || '';

        if (type === 'projects' && item.tags && item.tags.length) {
            previewMeta.textContent = item.tags.join(' · ');
            previewMeta.hidden = false;
        } else if (type === 'gallery') {
            previewMeta.textContent = [item.category, item.date ? formatDate(item.date) : ''].filter(Boolean).join(' · ');
            previewMeta.hidden = !previewMeta.textContent;
        } else if ((type === 'writing' || type === 'essays') && item.date) {
            previewMeta.textContent = formatDate(item.date);
            previewMeta.hidden = false;
        } else {
            previewMeta.hidden = true;
        }

        previewImage.src = item.image || item.previewImage || '';
        previewImage.alt = item.alt || (item.title ? 'Preview of ' + item.title : 'Gallery photo');

        // Clear any previous embed frame first
        if (typeof previewEmbedContainer !== 'undefined') {
            previewEmbedContainer.innerHTML = '';
            previewEmbedContainer.style.display = 'none';
        }

        if (type === 'gallery') {
            previewOverleafLink.style.display = 'none';
            previewGitHubLink.style.display = 'none';
        } else if (type === 'writing' || type === 'essays') {
            previewOverleafLink.href = item.url;
            previewOverleafLink.textContent = type === 'essays' ? 'Read essay' : 'Read article';
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

    function renderEmpty(container, message) {
        container.innerHTML = '';
        const empty = document.createElement('p');
        empty.className = 'writing-search-empty';
        empty.textContent = message;
        container.appendChild(empty);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    let lightboxOpener = null;

    function openLightbox(item, opener) {
        lightboxOpener = opener;
        lightboxImage.src = item.image;
        lightboxImage.alt = item.alt || item.title || 'Gallery photo';
        lightbox.hidden = false;
        document.body.classList.add('panel-open');
        lightbox.querySelector('.lightbox-close').focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightboxImage.src = '';
        document.body.classList.remove('panel-open');
        if (lightboxOpener) {
            lightboxOpener.focus();
            lightboxOpener = null;
        }
    }

    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !lightbox.hidden) {
            closeLightbox();
        }
    });

    function renderGallery(items) {
        if (!items.length) {
            renderEmpty(gridGallery, 'Photos and art coming soon.');
            return;
        }
        gridGallery.innerHTML = '';
        items.forEach(function (item) {
            const tile = document.createElement('button');
            tile.type = 'button';
            tile.className = 'gallery-tile';
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.alt || item.title || 'Gallery photo';
            img.loading = 'lazy';
            tile.appendChild(img);
            tile.addEventListener('click', function () { openLightbox(item, tile); });
            gridGallery.appendChild(tile);
        });
    }

    function renderResume(data) {
        resumeContent.innerHTML = '';
        if (data.pdf) {
            const dl = document.createElement('a');
            dl.className = 'preview-link';
            dl.href = data.pdf;
            dl.target = '_blank';
            dl.rel = 'noopener noreferrer';
            dl.textContent = 'Download PDF';
            resumeContent.appendChild(dl);
        }
        data.sections.forEach(function (section) {
            const block = document.createElement('section');
            block.className = 'resume-section';
            const h = document.createElement('h3');
            h.textContent = section.heading;
            block.appendChild(h);
            section.entries.forEach(function (entry) {
                const row = document.createElement('div');
                row.className = 'resume-entry';
                function addRow(cls, left, right) {
                    if (!left && !right) return;
                    const line = document.createElement('p');
                    line.className = cls;
                    const l = document.createElement('span');
                    l.textContent = left || '';
                    line.appendChild(l);
                    if (right) {
                        const r = document.createElement('span');
                        r.className = 'resume-right';
                        r.textContent = right;
                        line.appendChild(r);
                    }
                    row.appendChild(line);
                }
                addRow('resume-entry-title', entry.title, entry.location);
                addRow('resume-entry-sub', entry.subtitle, entry.date);
                if (entry.bullets && entry.bullets.length) {
                    const ul = document.createElement('ul');
                    ul.className = 'resume-bullets';
                    entry.bullets.forEach(function (text) {
                        const li = document.createElement('li');
                        li.textContent = text;
                        ul.appendChild(li);
                    });
                    row.appendChild(ul);
                }
                if (entry.detail) {
                    const d = document.createElement('p');
                    d.className = 'resume-entry-detail';
                    d.textContent = entry.detail;
                    row.appendChild(d);
                }
                block.appendChild(row);
            });
            resumeContent.appendChild(block);
        });
    }

    renderCards(gridProjects, portfolio.projects, 'projects');
    if (portfolio.essays.length) {
        renderCards(gridEssays, portfolio.essays, 'essays');
    } else {
        renderEmpty(gridEssays, 'Essays and research notes coming soon.');
    }
    renderGallery(portfolio.gallery);
    renderResume(portfolio.resume);

    // Randomly pick blue or green as the hover color each time a button is entered
    const hoverColors = ['#9DFBC1', '#84caff'];
    function pickHoverColor(event) {
        const target = event.target.closest && event.target.closest('button, a, .card');
        if (!target) return;
        if (event.type === 'mouseover' && target.contains(event.relatedTarget)) return;
        target.style.setProperty('--hover-color', hoverColors[Math.floor(Math.random() * hoverColors.length)]);
    }
    document.addEventListener('mouseover', pickHoverColor);
    document.addEventListener('focusin', pickHoverColor);

    if (window.location.hash && tabOrder.indexOf(window.location.hash.slice(1)) !== -1) {
        switchTab(window.location.hash.slice(1));
    }
    renderWritingGrid(portfolio.writing);
    loadRecentWork();

    writingViewToggle.addEventListener('click', function () {
        if (writingViewMode === 'grid') {
            writingViewMode = 'carousel';
            writingViewToggle.textContent = 'View as Grid';
            writingViewToggle.classList.add('is-active');
            writingViewToggle.setAttribute('aria-pressed', 'true');
            gridWriting.hidden = true;
            carouselWriting.hidden = false;
            renderCarousel(filteredWriting);
        } else {
            writingViewMode = 'grid';
            writingViewToggle.textContent = 'View as Carousel';
            writingViewToggle.classList.remove('is-active');
            writingViewToggle.setAttribute('aria-pressed', 'false');
            gridWriting.hidden = false;
            carouselWriting.hidden = true;
            renderCards(gridWriting, filteredWriting, 'writing');
        }
    });

    carouselPrev.addEventListener('click', function () { advanceCarousel(-1); });
    carouselNext.addEventListener('click', function () { advanceCarousel(1); });

    writingSearch.addEventListener('input', function () {
        const query = writingSearch.value.trim().toLowerCase();
        if (!query) {
            renderWritingGrid(portfolio.writing);
            return;
        }
        const results = portfolio.writing.filter(function (item) {
            return item.title.toLowerCase().includes(query) ||
                   item.teaser.toLowerCase().includes(query);
        });
        renderWritingGrid(results);
    });
})();
