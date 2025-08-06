
const viewContainer = document.getElementById('app-view');
const homeIcon = document.getElementById('home-icon')
const goToBtn = document.querySelector('.go-to-btn')
const goToBtn2 = document.querySelector('.go-to-btn2')
const viewButton = document.querySelector('.view-button')

viewButton.addEventListener('click', (e) => {
    e.preventDefault()
    loadView('./contact-me.html');
})

goToBtn.addEventListener('click', (e) => {
    e.preventDefault()
    loadView('./portfolio.html');
})

goToBtn2.addEventListener('click', (e) => {
    e.preventDefault()
    loadView('./contact-me.html');
})

homeIcon.addEventListener('click', (e) => {
    e.preventDefault()
    loadView('./home.html');
})

async function loadView(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        const html = await res.text();
        viewContainer.innerHTML = html;

        const sendMessageBtn = document.getElementById('send-message-btn');
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
        
                if (!contactForm.checkValidity()) {
                    contactForm.reportValidity(); 
                    return;
                }
        
                loadView('./home.html');
                history.pushState(null, '', './home.html');
            });
        }
    } catch (err) {
        viewContainer.innerHTML = `<p style="color:red">Error loading page.</p>`;
        console.error(err);
    }
}

document.querySelectorAll('a[data-view]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('a[data-view]').forEach(l => {
            l.classList.remove('active');
        });

        link.classList.add('active');

        const url = link.getAttribute('href');
        loadView(url);
        history.pushState(null, '', url);
    });
});

window.addEventListener('popstate', () => {
    loadView(location.pathname);
});

loadView('./home.html');
