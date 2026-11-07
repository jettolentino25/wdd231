const courseList = document.querySelector('#course-list');
const totalCredits = document.querySelector('#total-credits');
const filterButtons = document.querySelectorAll('.course-filters button');

function displayCourses(visibleCourses) {
    courseList.replaceChildren();

    for (const course of visibleCourses) {
        const card = document.createElement('p');
        card.classList.add('course-card');
        card.textContent = `${course.subject} ${course.number} — ${course.title}`;

        if (course.completed) {
            card.classList.add('completed');
            card.textContent += ' (Completed)';
        }

        courseList.append(card);
    }

    const creditSum = visibleCourses.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = creditSum;
}

for (const button of filterButtons) {
    button.addEventListener('click', () => {
        const subject = button.dataset.filter;
        const matchingCourses = subject === 'all'
            ? courses
            : courses.filter(course => course.subject === subject);

        displayCourses(matchingCourses);
    });
}

displayCourses(courses);