const application = new URLSearchParams(window.location.search);

if (application.get('firstName') && application.get('lastName')) {
    const fields = {
        'result-first-name': 'firstName',
        'result-last-name': 'lastName',
        'result-email': 'email',
        'result-phone': 'phone',
        'result-organization': 'organization',
        'result-timestamp': 'timestamp'
    };

    for (const [id, parameter] of Object.entries(fields)) {
        document.getElementById(id).textContent =
            application.get(parameter) || 'Unavailable';
    }

    document.getElementById('application-summary').textContent =
        'Thank you for completing the Manila Chamber of Commerce membership application.';
    document.getElementById('application-details').hidden = false;
}