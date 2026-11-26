const timestamp = document.querySelector('#timestamp');
timestamp.value = new Date().toISOString();

const membershipLinks = document.querySelectorAll('.membership-card a');

for (const link of membershipLinks) {
    const dialog = document.querySelector(link.hash);
    const closeButton = dialog.querySelector('.close-dialog');

    link.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.showModal();
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    });
}