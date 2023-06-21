const loggedInUserCookie = getCookie("loggedInUser");
const loggedInUser = JSON.parse(loggedInUserCookie.slice(2));

fetch(`/getShiftsByBabysitterId?babysitterID=${loggedInUser.babysitterID}`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((response) => {
        if (response) {
            drawTable(response);
        } else {
            alert("no shifts was found");
        }
    });

function drawTable(shifts) {
    const table = document.querySelector("table tbody");
    for (let i = 0; i < shifts.length; i++) {
        const shift = shifts[i];
        let html = `
        <tr>
            <td>${shift.city}</td>
            <td>${toDateTime(shift.start_time)}</td>
            <td>${toDateTime(shift.end_time)}</td>
            <td>
                <button class="action-btn" onclick="deleteShift(${
                    shift.shiftID
                })">Delete</button>
            </td>
        </tr>
    `;
        table.innerHTML += html;
    }
}

function deleteShift(id) {
    fetch(`/deleteShift?id=${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((response) => {
            if (response) {
                window.location.reload();
            } else {
                alert("could not delete shift");
            }
        });
}
