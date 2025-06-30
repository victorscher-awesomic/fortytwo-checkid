const openModal = document.getElementById('open-modal');
const btnCloseModals = document.querySelectorAll('.close-modal');
const modal = document.getElementById('modal');

openModal.addEventListener('click', () => {
    modal.classList.add('active');
});

btnCloseModals.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}); 