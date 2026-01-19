// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const questionForm = document.getElementById('questionForm');
    const formMessage = document.getElementById('formMessage');
    
    questionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(questionForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            category: formData.get('category'),
            question: formData.get('question'),
            newsletter: formData.get('newsletter') ? true : false
        };
        
        // Simular envio (em um caso real, enviaria para um servidor)
        setTimeout(() => {
            showMessage('Sua pergunta foi enviada com sucesso! Responderemos em breve.', 'success');
            questionForm.reset();
        }, 1000);
        
        // Mostrar mensagem de carregamento
        showMessage('Enviando sua pergunta...', 'loading');
    });
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Validação em tempo real
    const inputs = questionForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove mensagens de erro anteriores
        clearError(e);
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo é obrigatório');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Por favor, insira um e-mail válido');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#dc2626';
        
        let errorDiv = field.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.color = '#dc2626';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
    
    function clearError(e) {
        const field = e.target;
        field.style.borderColor = '#d1d5db';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Contador de caracteres para textarea
    const textarea = document.getElementById('question');
    const maxLength = 500;
    
    // Criar contador
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.style.textAlign = 'right';
    counter.style.fontSize = '0.875rem';
    counter.style.color = '#6b7280';
    counter.style.marginTop = '0.25rem';
    textarea.parentNode.appendChild(counter);
    
    function updateCounter() {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${remaining} caracteres restantes`;
        
        if (remaining < 50) {
            counter.style.color = '#dc2626';
        } else {
            counter.style.color = '#6b7280';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    textarea.setAttribute('maxlength', maxLength);
    updateCounter();
});

