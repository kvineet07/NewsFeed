function fetchRSSAndPopulateAccordion(link, index) {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${link}`)
        .then(response => response.json())
        .then(data => {
            const title = data.feed.title;
            const articles = data.items;

            // Get accordion container
            const accordionContainer = document.getElementById('accordionExample');

            // Create HTML structure for accordion item
            let accordionItemHtml = `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                            <h5>${title}</h5>
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="carouselExample${index}" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
            `;

            // Add carousel items for each article
            articles.forEach((article, articleIndex) => {
                const activeClass = articleIndex === 0 ? 'active' : '';

                // HTML for each carousel item (news article)
                accordionItemHtml += `
                    <div class="carousel-item ${activeClass}">
                        <div class="card">
                            <a href="${article.link}" target="_blank" class="cardlink">
                                <img src="${article.enclosure.link}" class="card-img-top img-fluid" alt="${article.title}">
                                <div class="card-body">
                                    <h3 class="card-title text-truncate">${article.title}</h3>
                                    <h6 class="card-subtitle">${article.author}&ensp;&bull;&ensp;${new Date(article.pubDate).toLocaleDateString('en-IN')}</h6>
                                    <p class="card-text text-truncate">${article.description}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            });

            // Close carousel inner and add carousel controls
            accordionItemHtml += `
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append the constructed accordion item to the container
            accordionContainer.innerHTML += accordionItemHtml;
        })
        .catch(error => console.error('Error fetching RSS feed:', error));
}

// Iterate through each RSS feed URL and populate the accordion
magazines.forEach((link, index) => {
    fetchRSSAndPopulateAccordion(link, index);
});
