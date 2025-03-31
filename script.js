let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section'); 
let navLinks = document.querySelectorAll('header nav a'); 

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => { 
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id'); 

        if (top >= offset && top < offset + height) {
        
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


document.addEventListener('click', function(event) {

    const isNavbarActive = navbar.classList.contains('active');
    const isMenuIcon = event.target === menuIcon || menuIcon.contains(event.target);
    const isClickInsideNavbar = navbar.contains(event.target);
    
    if (isNavbarActive && !isMenuIcon && !isClickInsideNavbar) {

        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var formData = new FormData(this);

    fetch('https://formspree.io/f/xeoalvdp', {  
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {

            document.getElementById('success-message').style.display = 'block';

            document.getElementById('contact-form').reset();

            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 5000); 
        } else {
            console.error('Erro no envio: ' + response.status);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar a mensagem:', error);
    });
});
