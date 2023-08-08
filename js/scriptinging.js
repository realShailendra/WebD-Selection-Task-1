const jsonUrl = 'https://test-data-gules.vercel.app/data.json'; // Replace with the actual JSON URL

async function fetchData() {
    try {
        const response = await fetch(jsonUrl);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

async function displayData() {
    const dataContainer = document.getElementById('data-container');

    const jsonData = await fetchData();

    if (jsonData) {
        const courses = jsonData.data;

        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course';

            const courseTitle = document.createElement('button'); // Change to a button element
            courseTitle.className = 'course-title'; // Add a class for styling
            courseTitle.textContent = course.title;
            courseDiv.appendChild(courseTitle);

            const questions = course.ques;
            const questionsList = document.createElement('ul');
            questionsList.className = 'questions-list'; // Add class for styling and toggling

            questions.forEach(question => {
                const questionItem = document.createElement('li');
                questionItem.className = 'question';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'question-checkbox';
                questionItem.appendChild(checkbox);

                const questionTitle = document.createElement('h3');
                questionTitle.textContent = question.title;
                questionItem.appendChild(questionTitle);

                const questionLinks = document.createElement('div');
                questionLinks.className = 'question-links';

                if (question.yt_link) {
                    const ytLink = document.createElement('a');
                    ytLink.textContent = 'Watch on YouTube';
                    ytLink.href = question.yt_link;
                    ytLink.target = '_blank';
                    questionLinks.appendChild(ytLink);
                }

                if (question.p1_link) {
                    const p1Link = document.createElement('a');
                    p1Link.textContent = 'Practice 1';
                    p1Link.href = question.p1_link;
                    p1Link.target = '_blank';
                    questionLinks.appendChild(p1Link);
                }

                if (question.p2_link) {
                    const p2Link = document.createElement('a');
                    p2Link.textContent = 'Practice 2';
                    p2Link.href = question.p2_link;
                    p2Link.target = '_blank';
                    questionLinks.appendChild(p2Link);
                }

                questionItem.appendChild(questionLinks);
                questionsList.appendChild(questionItem);
            });

            // Initially hide the questions list
            questionsList.style.display = 'none';

            courseDiv.appendChild(questionsList);
            dataContainer.appendChild(courseDiv);

            // Add event listener to toggle the questions list on clicking the course title
            courseTitle.addEventListener('click', () => {
                questionsList.style.display = questionsList.style.display === 'none' ? 'block' : 'none';
            });
        });
    } else {
        dataContainer.innerHTML = 'Error fetching JSON data.';
    }
}

displayData();










async function displayData() {
    const dataContainer = document.getElementById('data-container');
    
 
    
    const progressBar = document.getElementById('progress-bar');




    const searchInput = document.getElementById('search-input');

    const jsonData = await fetchData();
    let totalQuestions = 0;
    let completedQuestions = 0;

    if (jsonData) {
        const courses = jsonData.data;



// Function to filter courses and questions based on search input
function filterContent(searchText) {
    courses.forEach(course => {
        const courseTitle = course.title.toLowerCase();
        const questions = course.ques;

        // Hide or show course based on search input
        if (courseTitle.includes(searchText.toLowerCase())) {
            courseDiv.style.display = 'block';
        } else {
            courseDiv.style.display = 'none';
        }

        questions.forEach(question => {
            const questionTitle = question.title.toLowerCase();
            const questionItem = questionItemMap.get(questionTitle);

            // Hide or show question based on search input
            if (questionTitle.includes(searchText.toLowerCase())) {
                questionItem.style.display = 'block';
            } else {
                questionItem.style.display = 'none';
            }
        });
    });
}

const questionItemMap = new Map(); // Map to store question items for filtering











       


        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course';

           


            const courseTitle = document.createElement('button'); // Change to a button element
            courseTitle.className = 'course-title'; // Add a class for styling
            courseTitle.textContent = course.title;
            courseDiv.appendChild(courseTitle);

            const questions = course.ques;
            const questionsList = document.createElement('ul');
            questionsList.className = 'questions-list'; // Add class for styling and toggling

            questions.forEach(question => {
                const questionItem = document.createElement('li');
                questionItem.className = 'question';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'question-checkbox';
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        questionItem.classList.add('checked'); // Add the 'checked' class to the question item
                        completedQuestions++;
                    } else {
                        questionItem.classList.remove('checked'); // Remove the 'checked' class from the question item
                        completedQuestions--;
                    }
                    updateProgressBar();
                });
                questionItem.appendChild(checkbox);

                const questionTitle = document.createElement('h3');
                questionTitle.textContent = question.title;
                questionItem.appendChild(questionTitle);

                const questionLinks = document.createElement('div');
                questionLinks.className = 'question-links';


            







                if (question.yt_link) {
                    const ytLink = document.createElement('a');
                    ytLink.textContent = 'Watch on YouTube';
                    ytLink.href = question.yt_link;
                    ytLink.target = '_blank';
                    questionLinks.appendChild(ytLink);
                }

                if (question.p1_link) {
                    const p1Link = document.createElement('a');
                    p1Link.textContent = 'Practice 1';
                    p1Link.href = question.p1_link;
                    p1Link.target = '_blank';
                    questionLinks.appendChild(p1Link);
                }

                if (question.p2_link) {
                    const p2Link = document.createElement('a');
                    p2Link.textContent = 'Practice 2';
                    p2Link.href = question.p2_link;
                    p2Link.target = '_blank';
                    questionLinks.appendChild(p2Link);
                }

                questionItem.appendChild(questionLinks);
                questionsList.appendChild(questionItem);
                totalQuestions++;
            });

            // Initially hide the questions list
            questionsList.style.display = 'none';

            courseDiv.appendChild(questionsList);
            dataContainer.appendChild(courseDiv);

            // Add event listener to toggle the questions list on clicking the course title
            courseTitle.addEventListener('click', () => {
                questionsList.style.display = questionsList.style.display === 'none' ? 'block' : 'none';
            });
        });
    } else {
        dataContainer.innerHTML = 'Error fetching JSON data.';
    }

    function updateProgressBar() {
        const progressPercent = (completedQuestions / totalQuestions) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
}
