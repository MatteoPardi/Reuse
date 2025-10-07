/**
 * store.js — Logica mock per la pagina e-commerce Rinnova
 * -------------------------------------------------------
 * Questo script gestisce la simulazione dei filtri di categoria e
 * aggiorna dinamicamente il riepilogo del catalogo. Le funzioni sono
 * pensate per essere sostituite da chiamate API o da un data-store reale.
 */

const filterButtons = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('.product-card[data-category]');
const summaryElement = document.getElementById('catalogue-summary');

/**
 * Aggiorna lo stato attivo dei pulsanti filtro per fornire feedback visivo.
 */
function setActiveFilter(button) {
    filterButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');
}

/**
 * Mostra o nasconde le schede prodotto in base alla categoria selezionata.
 * @param {string} filter - Categoria selezionata, "all" per mostrare tutto.
 */
function applyFilter(filter) {
    let visibleCount = 0;

    productCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !matches);
        card.setAttribute('aria-hidden', matches ? 'false' : 'true');
        if (matches) {
            visibleCount += 1;
        }
    });

    if (summaryElement) {
        const label = filter === 'all' ? 'prodotti disponibili' : `prodotti nella categoria "${mapFilterToLabel(filter)}"`;
        summaryElement.textContent = `${visibleCount} ${label}`;
    }
}

/**
 * Converte il codice filtro in un'etichetta leggibile.
 * @param {string} filter
 * @returns {string}
 */
function mapFilterToLabel(filter) {
    const labels = {
        moda: 'Moda e accessori',
        tech: 'Tech ricondizionato',
        casa: 'Casa & design',
        green: 'Upcycling & materiali',
    };

    return labels[filter] || 'tutte le categorie';
}

/**
 * Gestisce il click sui filtri applicando le trasformazioni necessarie.
 * @param {MouseEvent} event
 */
function handleFilterClick(event) {
    const button = event.currentTarget;
    const filter = button.dataset.filter;
    setActiveFilter(button);
    applyFilter(filter);
}

/**
 * Inizializza gli event listener della pagina store.
 */
function initStore() {
    if (!filterButtons.length) {
        return;
    }

    filterButtons.forEach((button) => {
        button.addEventListener('click', handleFilterClick);
    });

    // Imposta lo stato iniziale mostrando tutte le categorie.
    applyFilter('all');
}

initStore();
