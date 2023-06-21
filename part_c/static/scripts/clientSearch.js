const table = document.querySelector("#babysitter-table tbody");
const start_time = document.getElementById("start_time");
const end_time = document.getElementById("end_time");
const city = document.getElementById("city");

let babysitters = [];
if (localStorage.getItem("clientSearch")) {
    const clientSearch = JSON.parse(localStorage.getItem("clientSearch"));
    start_time.value = clientSearch.start;
    end_time.value = clientSearch.end;
    city.value = clientSearch.city;

    fetch(
        `/searchBabysitters?city=${clientSearch.city}&start=${clientSearch.start}&end=${clientSearch.end}`,
        { method: "GET" }
    )
        .then((response) => response.json())
        .then((response) => {
            if (response) {
                babysitters = response;
                drawTable(babysitters);
            } else {
                alert("no babysitters was found for the given search");
            }
        });
}

function drawTable(babysitters) {
    for (let i = 0; i < babysitters.length; i++) {
        const babysitter = babysitters[i];
        let html = `
            <tr>
                <td>${babysitter.full_name}</td>
                <td>${babysitter.phone_Number}</td>
                <td>${babysitter.email}</td>
                <td>${toDate(babysitter.Date_Of_Birth)}</td>
                <td>${babysitter.gender}</td>
                <td>${babysitter.skill}</td>
                <td>
                    <button class="action-btn" onclick="chooseBabysitter(${
                        babysitter.babysitterID
                    })">Choose</button>
                </td>
            </tr>
        `;
        table.innerHTML += html;
    }
}

function chooseBabysitter(id) {
    if (localStorage.getItem("clientSearch")) {
        const clientSearch = JSON.parse(localStorage.getItem("clientSearch"));

        fetch("/updateOrderBabysitter", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: clientSearch.orderID,
                babysitterID: id,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    localStorage.clear();
                    window.location = "/ordersClient";
                } else if (res.error) {
                    console.log(res);
                    alert(res.error);
                }
            });
    }
}
