document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.getElementById('open-form');
    const closeFormButton = document.getElementById('close-form');
    const formPopup = document.getElementById('form-popup');
    const form = document.getElementById('contact-form');

    // Elementos do modal de mensagem
    const messagePopup = document.getElementById('message-popup');
    const closeMessageButton = document.getElementById('close-message');
    const messageTitle = document.getElementById('message-title');
    const messageText = document.getElementById('message-text');

    // Abrir o modal do formulário
    openFormButton.addEventListener('click', () => {
        formPopup.style.display = 'flex';
    });

    // Fechar o modal do formulário
    closeFormButton.addEventListener('click', () => {
        formPopup.style.display = 'none';
    });

    // Fechar o modal do formulário ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === formPopup) {
            formPopup.style.display = 'none';
        }
    });

    // Fechar o modal de mensagem
    closeMessageButton.addEventListener('click', () => {
        messagePopup.style.display = 'none';
    });

    // Fechar o modal de mensagem ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === messagePopup) {
            messagePopup.style.display = 'none';
        }
    });

    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        fetch('http://localhost:3000/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Exibe a mensagem de sucesso
                messageTitle.textContent = 'Sucesso!';
                messageText.textContent = 'E-mail enviado com sucesso!';
                messagePopup.style.display = 'flex';
            } else {
                // Exibe a mensagem de erro
                messageTitle.textContent = 'Erro!';
                messageText.textContent = 'Erro ao enviar o e-mail: ' + data.message;
                messagePopup.style.display = 'flex';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            // Exibe a mensagem de erro
            messageTitle.textContent = 'Erro!';
            messageText.textContent = 'Erro ao enviar o e-mail. Tente novamente mais tarde.';
            messagePopup.style.display = 'flex';
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const grupos = document.querySelectorAll('.grupo-depoimentos');
    let currentIndex = 0;

    function mostrarProximoGrupo() {
        // Oculta o grupo atual
        grupos[currentIndex].classList.remove('ativo');

        // Avança para o próximo grupo
        currentIndex = (currentIndex + 1) % grupos.length;

        // Exibe o próximo grupo
        grupos[currentIndex].classList.add('ativo');
    }

    // Exibe o primeiro grupo ao carregar a página
    grupos[currentIndex].classList.add('ativo');

    // Troca os grupos a cada 5 segundos (5000 milissegundos)
    setInterval(mostrarProximoGrupo, 5000);
});