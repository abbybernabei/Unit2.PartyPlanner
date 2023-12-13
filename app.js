const API_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-MT-WEB-PT/events";

// INITIAL STATE ***************************************
const state = {
  events: [],
};

// SELECTORS ********************************************
const eventList = document.querySelector("#events");
const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

// METHODS **********************************************
async function render() {
  await getEvents();
  renderEvents();
}
render();

//GET request - read
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log("json", json.data);
    state.events = json.data;
  } catch (error) {
    console.error(error, "There was an error /GET Events");
  }
}

//CREATE request - post
async function createEvents(name, description, date, location) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, date, location }),
    });

    const json = await response.json();
    console.log("json", json);

    if (json.error) {
      throw new Error(json.message);
    }
    // render();
  } catch (error) {
    console.error(error, "There was an error /POST Events");
  }
}

//UPDATE - put
async function updateEvent(id, name, description, date, location) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, date, location }),
    });

    const json = await response.json();
    console.log("json", json);

    if (json.error) {
      throw new Error(json.message);
    }
    // render();
  } catch (error) {
    console.error(error, "There was an error /PUT Events");
  }
}

//DELETE - delete
async function deleteEvent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Event could not be deleted");
    }
    // render();
  } catch (error) {
    console.error(error, "There was an error /DELETE Event");
  }
}

//Render events
function renderEvents() {
  if (!state.events.length) {
    eventList.textContent = `<li> No Events Found </li>`;
  }

  const eventCards = state.events.map((event) => {
    const eventCard = document.createElement("li");
    eventCard.classList.add("event");
    eventCard.textContent = `
    <h2>${event.name}</h2>
    <p>"${event.description}"</p>
    <p>"${event.date}"</p>
    <p>"${event.location}"</p>
    `;

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Event";

    eventCard.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteEvent(event.id));

    return eventCard;
  });
  eventList.replaceChildren(...eventCards);
}

async function addEvent(event) {
  event.preventDefault();

  await createEvents(
    addEventForm.name.value,
    addEventForm.description.value,
    addEventForm.date.value,
    addEventForm.location.value
  );
}
