// const circle = document.querySelector('.pies');
// const tooltip = document.querySelector('.tooltip');

// const charts = document.querySelectorAll('.entry');

// // Add an event listener to each element for the mouseover event


// // Show the tooltip and move it with the mouse
// circle.addEventListener('mousemove', (event) => {
//     charts.forEach(element => {
//         element.addEventListener('mouseover', (event) => {
//             const hoveredElement = event.target; // The element being hovered
//             const chartName = hoveredElement.dataset.chart;
//             tooltip.textContent = chartName; // Customize tooltip content
//         });
//         tooltip.style.display = 'block'; // Show the tooltip
//         tooltip.style.left = event.pageX + 15 + 'px'; // Offset by 15px to avoid overlapping with cursor
//         tooltip.style.top = event.pageY + 15 + 'px';
//     });

// });

// // Hide the tooltip when not hovering
// circle.addEventListener('mouseleave', () => {
//     tooltip.style.display = 'none'; // Hide the tooltip
// });

const fetchBtn = document.querySelectorAll('.fetch-btn')
const infoDiv = document.querySelector('.info')

const foldBtn = document.querySelectorAll('.fold')
const unfoldBtn = document.querySelectorAll('.unfold')

fetchBtn.forEach((element) => {
    // console.log(element.dataset.name);
    const parentDiv = element.closest('div[data-which]')

    element.addEventListener('click', () => {
        setTimeout(() => { fetchInfo(parentDiv) }, 0)
    })
})

async function fetchInfo(parentDiv) {
    try {
        console.log(parentDiv);
        const res = await fetch('./assets/about.json')
        let jsonString = '';

        if (!res.ok) {
            throw new Error("Response is not ok!")
        }

        const data = await res.json()
        console.log(data);

        if (parentDiv.dataset.which == 'front') {
            jsonString = JSON.stringify(data.frontend, null, 2);
            // console.log(name);
        } else {
            jsonString = JSON.stringify(data.backend, null, 2);
        }

        // const info = `
        //     <p><strong>Name:</strong> ${data.name}</p>
        //     <p><strong>Bio:</strong> ${data.bio}</p>
        //     <p><strong>Skills:</strong> ${data.skills.join(', ')}</p>
        //     <p><strong>Experience:</strong> ${data.experience}</p>
        // `

        infoDiv.innerHTML = jsonString;
        foldBtn.forEach((btn => {
            if (btn.closest('div[data-which]') == parentDiv) {
                btn.style.display = 'block'
            }
        }))

    } catch (error) {
        console.error("fetching error: ", error);
    }
}

foldBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        foldDiv(event, 'fold');
    });
});
unfoldBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        foldDiv(event, 'unfold');
    });
});

function foldDiv(event, action) {
    const clicked = event.target

    foldBtn.forEach((btn) => {
        if (btn.closest('div[data-which]') == clicked.closest('div[data-which]')) {
            infoDiv.style.height = '0'
            btn.style.display = 'none'
        } else {
            infoDiv.style.height = 'auto';
            btn.style.display = 'none'
        }
    })
}

// function unfoldDiv() {
//     infoDiv.style.height = 'auto';
//     unfoldBtn.style.display = 'none'
//     foldBtn.style.display = 'block'
// }


/* =============================================== PROJECTS.JS ======================================================*/
// document.querySelectorAll('.card').forEach(card => {
//     const images = card.querySelectorAll('.slider-image');
//     const prevButton = card.querySelector('.slider-btn.prev');
//     const nextButton = card.querySelector('.slider-btn.next');
//     let current = 0;

//     const updateSlider = (index) => {
//       images.forEach((img, i) => {
//         img.classList.toggle('active', i === index);
//       });
//     };

//     prevButton.addEventListener('click', () => {
//       current = (current - 1 + images.length) % images.length;
//       updateSlider(current);
//     });

//     nextButton.addEventListener('click', () => {
//       current = (current + 1) % images.length;
//       updateSlider(current);
//     });

//     updateSlider(current);
//   });

const images = document.querySelectorAll('.project-img')
const title = document.getElementById('project-title');
const description = document.getElementById('project-description');
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const projects = [
    { title: 'Project Title 1', description: 'Description of Project 1.' },
    { title: 'Project Title 2', description: 'Description of Project 2.' },
    { title: 'Project Title 3', description: 'Description of Project 3.' },
];

let current = 0;

function slide(index) {
    images.forEach((img, i) => {
        img.classList.remove('active', 'previous', 'next')

        if (i === index) {
            img.classList.add('active')
        } else if (i === (index + 1) % images.length) {
            img.classList.add('next')
        } else if (i === (index - 1 + images.length) % images.length) {
            img.classList.add('previous')
        }
    })
}
prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    console.log('prev btn');
    slide(current);
});

nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    console.log('next btn');
    slide(current);
});

// init
slide(current)
