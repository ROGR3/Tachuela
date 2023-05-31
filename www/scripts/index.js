const activities = document.querySelectorAll('.singleActivity');

let translation = 0;
activities.forEach((activity) => {
    let startX;
    let isMoving = false;
    const maxDrag = 70
    translation = 0
    const draggableDiv = activity.querySelector(".draggable")
    const deleteIcon = activity.querySelector(".activityControl .left")
    const acceptIcon = activity.querySelector(".activityControl .right")
    deleteIcon.addEventListener("click", e => {
        console.log("clicked delete")
    })
    acceptIcon.addEventListener("click", e => {
        console.log("clicked accept")
    })

    activity.addEventListener('touchstart', handleTouchStart, { passive: true });
    activity.addEventListener('touchmove', handleTouchMove, { passive: true });
    activity.addEventListener('touchend', handleTouchEnd, { passive: true });

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
        isMoving = true;
    }

    function handleTouchMove(event) {
        if (!isMoving) return;

        const currentX = event.touches[0].clientX;
        const diffX = currentX - startX;

        translation += diffX;
        startX = currentX;

        if (translation < -maxDrag) {
            translation = -maxDrag;
        } else if (translation > maxDrag) {
            translation = maxDrag;
        }

        updatePosition();
    }

    function handleTouchEnd() {
        isMoving = false;
        translation = translation > (maxDrag - 1) ? maxDrag : translation < -(maxDrag - 1) ? -maxDrag : 0;
        updatePosition();
    }
    function updatePosition() {
        draggableDiv.style.transform = `translateX(${translation}px)`;
    }

});

document.addEventListener('click', handleOutsideClick);

function handleOutsideClick(event) {
    if (!event.target.closest('.singleActivity')) {
        activities.forEach((activity) => {
            const draggableDiv = activity.querySelector('.draggable');
            translation = 0;
            draggableDiv.style.transform = 'translateX(0)';
        });
    }
}

