// Advanced filtering for Featured Designs and Browse Products
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('mainSearch');
  // Featured Designs
  const featuredSection = document.querySelector('section.bg-light:not([id])');
  const featuredCards = featuredSection ? featuredSection.querySelectorAll('.card') : [];
  // Browse Products
  const productsSection = document.getElementById('featuredDesigns');
  const productItems = productsSection ? productsSection.querySelectorAll('.product-hover') : [];

  // Add 'No results found' message for both sections
  function getNoResultsMsg(section) {
    let msg = section.querySelector('.no-results-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'no-results-msg text-center text-muted my-3';
      msg.textContent = 'No results found.';
      section.appendChild(msg);
    }
    return msg;
  }

  const featuredNoResults = featuredSection ? getNoResultsMsg(featuredSection) : null;
  const productsNoResults = productsSection ? getNoResultsMsg(productsSection) : null;

  if (!searchInput) return;

  // Helper to trigger fade-in animation
  function fadeInElements(elements) {
    elements.forEach(el => {
      el.classList.remove('fade-in');
      void el.offsetWidth; // force reflow
      el.classList.add('fade-in');
    });
  }

  // Initial fade-in on page load
  fadeInElements(Array.from(featuredCards));
  fadeInElements(Array.from(productItems));

  searchInput.addEventListener('input', function() {
    const query = searchInput.value.trim().toLowerCase();

    // Filter Featured Designs
    let featuredVisible = 0;
    featuredCards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const desc = card.querySelector('.card-text') ? card.querySelector('.card-text').textContent.toLowerCase() : '';
      if (title.includes(query) || desc.includes(query)) {
        card.parentElement.style.display = '';
        featuredVisible++;
      } else {
        card.parentElement.style.display = 'none';
      }
    });
    // Animate visible cards
    fadeInElements(Array.from(featuredCards).filter(card => card.parentElement.style.display !== 'none'));
    if (featuredNoResults) {
      if (featuredVisible === 0) {
        featuredNoResults.classList.add('show');
      } else {
        featuredNoResults.classList.remove('show');
      }
    }

    // Filter Browse Products
    let productsVisible = 0;
    productItems.forEach(item => {
      const name = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';
      if (name.includes(query)) {
        item.style.display = '';
        productsVisible++;
      } else {
        item.style.display = 'none';
      }
    });
    // Animate visible products
    fadeInElements(Array.from(productItems).filter(item => item.style.display !== 'none'));
    if (productsNoResults) {
      if (productsVisible === 0) {
        productsNoResults.classList.add('show');
      } else {
        productsNoResults.classList.remove('show');
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();
      productCards.forEach((card) => {
        const name = card.getAttribute("data-name").toLowerCase();
        if (name.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});

