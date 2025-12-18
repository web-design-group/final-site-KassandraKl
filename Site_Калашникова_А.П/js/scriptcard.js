
function loadCardsSequentially() {
    const cards = document.querySelectorAll('.masterclass-card');

    cards.forEach((card, index) => {

        setTimeout(() => {
 
            card.classList.remove('skeleton');

  
            card.querySelectorAll('.skeleton-text')
                .forEach(el => {
                    el.classList.remove('skeleton-text');

                    if (el.classList.contains('buy-ticket-btn')) {
                        el.style.background = '#f3d06f';
                        el.style.color = '#2d1e8c';
                    }
                });

            const img = card.querySelector('img');
            if (img) {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 10);
            }

            console.log(`Карточка ${index + 1} загружена`);
        }, (index + 1) * 1000); // 1с, 2с, 3с
    });
}


window.addEventListener('load', function () {

    setTimeout(loadCardsSequentially, 500);
});


if (document.readyState === 'complete') {
    setTimeout(loadCardsSequentially, 500);
}
