// helper functions
const $ = (id) => document.getElementById(id);
const el = (tag) => document.createElement(tag);
const make = (tag, className, text) => {
  const e = el(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
};

const calEl = $("calendar");
const monthYearEl = $("monthYear");
const modalEl = $("eventModal");
let currentDate = new Date();

const renderCalendar = (date = new Date()) => {
  calEl.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;

  monthYearEl.textContent = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weekDays.forEach((day) => {
    const dayEl = make("div", "day-name", day);
    calEl.appendChild(dayEl);
  });

  for (let i = 0; i < firstDayOfMonth; i++) {
    calEl.appendChild(el("div"));
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const cell = make("div", "day");

    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add("today");
    }

    const dateEl = el("div");
    dateEl.className = "date-number";
    dateEl.textContent = day;
    cell.appendChild(dateEl);

    const eventsToday = events.filter((e) => e.date === dateStr);
    const eventBox = make("div", "events");

    eventsToday.forEach((event) => {
      const ev = make("div", "event");

      const courseEl = make("div", "course", event.title.split(" - ")[0]);
      const instructorEl = make("div", "instructor", event.title.split(" - ")[1]);
      const timeEl = make("div", "time", `⏱️ ${event.start_time} - ${event.end_time}`);

      ev.append(courseEl, instructorEl, timeEl);
      eventBox.appendChild(ev);
    });

    // ➕ ➖ Overlay buttons
    const overlay = make("div", "day-overlay");
    const addBtn = make("button", "overlay-btn", "➕ Add");

    addBtn.onclick = (e) => {
      e.stopPropagation();
      openModalForAdd(dateStr);
    };

    overlay.appendChild(addBtn);

    if (eventsToday.length > 0) {
      const editBtn = make("button", "overlay-btn", " ✏️ Edit");

      editBtn.onclick = (e) => {
        e.stopPropagation();
        openModalForEdit(eventsToday);
      };

      overlay.appendChild(editBtn);
    }

    cell.append(overlay, eventBox);
    calEl.appendChild(cell);
  }
};

// ✅ Add Event Modal
const openModalForAdd = (dateStr) => {
  $("formAction").value = "add";
  $("eventId").value = "";
  $("deleteEventId").value = "";
  $("courseName").value = "";
  $("instructorName").value = "";
  $("startDate").value = dateStr;
  $("endDate").value = dateStr;
  $("startTime").value = "09:00";
  $("endTime").value = "10:00";

  const selector = $("eventSelector");
  const wrapper = $("eventSelectorWrapper");

  if (selector && wrapper) {
    selector.innerHTML = "";
    wrapper.style.display = "none";
  }

  modalEl.style.display = "flex";
};

// ✏️ Edit Event Modal
const openModalForEdit = (eventsOnDate) => {
  $("formAction").value = "edit";
  modalEl.style.display = "flex";

  const selector = $("eventSelector");
  const wrapper = $("eventSelectorWrapper");

  selector.innerHTML = "<option disabled selected>Choose event...</option>";

  eventsOnDate.forEach((e) => {
    const option = el("option");
    option.value = JSON.stringify(e);
    option.textContent = `${e.title} (${e.start} ➡️ ${e.end})`;
    selector.appendChild(option);
  });

  if (eventsOnDate.length > 1) {
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }

  handleEventSelection(JSON.stringify(eventsOnDate[0]));
};

// ⬇️ Autofill the Form
const handleEventSelection = (eventJSON) => {
  const event = JSON.parse(eventJSON);

  $("eventId").value = event.id;
  $("deleteEventId").value = event.id;

  const [course, instructor] = event.title.split(" - ").map((e) => e.trim());

  $("courseName").value = course || "";
  $("instructorName").value = instructor || "";
  $("startDate").value = event.start || "";
  $("endDate").value = event.end || "";
  $("startTime").value = event.start_time || "";
  $("endTime").value = event.end_time || "";
};

// ❌ Close the Modal
const closeModal = () => {
  modalEl.style.display = "none";
};
const cancelBtn = $("cancel");
if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

// 🔄 Navigate Between Months
const changeMonth = (offset) => {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate);
};

const prevMonthBtn = $("prevMonthBtn");
if (prevMonthBtn) prevMonthBtn.addEventListener("click", () => changeMonth(-1));
const nextMonthBtn = $("nextMonthBtn");
if (nextMonthBtn) nextMonthBtn.addEventListener("click", () => changeMonth(1));

// ⏰ Update the Clock
const updateClock = () => {
  const now = new Date();
  const clock = $("clock");
  clock.textContent = [
    now.getHours().toString().padStart(2, "0"),
    now.getMinutes().toString().padStart(2, "0"),
    now.getSeconds().toString().padStart(2, "0"),
  ].join(":");
};

// 🚀 Run on Page Load
renderCalendar(currentDate);
updateClock();
setInterval(updateClock, 1000);
