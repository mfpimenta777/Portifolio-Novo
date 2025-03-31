let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section'); // Agora seleciona todas as seções
let navLinks = document.querySelectorAll('header nav a'); // Agora seleciona todos os links

// Lógica de scroll
window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => { // Itera por todas as seções
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id'); // Corrigido de getAtribute para getAttribute

        if (top >= offset && top < offset + height) {
            // Remove a classe 'active' de todos os links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Adiciona a classe 'active' ao link correspondente
            document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
        }
    });
};

// Lógica para abrir/fechar o menu
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


// Lógica para fechar o menu ao clicar fora (se estiver aberto)
document.addEventListener('click', function(event) {
    // Verifica se o menu está aberto (tem a classe 'active')
    const isNavbarActive = navbar.classList.contains('active');
    const isMenuIcon = event.target === menuIcon || menuIcon.contains(event.target);
    const isClickInsideNavbar = navbar.contains(event.target);
    
    if (isNavbarActive && !isMenuIcon && !isClickInsideNavbar) {
        // Fecha o menu
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});


// Lógica do envio do formulário
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    var formData = new FormData(this);

    fetch('https://formspree.io/f/xeoalvdp', {  // Substitua pelo seu ID único do Formspree
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Exibe a mensagem de sucesso
            document.getElementById('success-message').style.display = 'block';

            // Limpa o formulário após o envio
            document.getElementById('contact-form').reset();

            // Opcional: Esconde a mensagem de sucesso após alguns segundos
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 5000); // A mensagem desaparecerá após 5 segundos
        } else {
            console.error('Erro no envio: ' + response.status);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar a mensagem:', error);
    });
});
