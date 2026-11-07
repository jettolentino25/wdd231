const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        completed: false
    }
];

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

// Show all courses when the page loads.
displayCourses(courses);