<?php
include "calendar.php"
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UtF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calendar Project 🗓️✍️</title>

    <meta name="description" content="Calendar, MySQL-PHP-JS" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:wght@400;600;700&display=swap">
    <link rel="stylesheet" href="style.css" />
    <script src="calendar.js" defer></script>
  </head>

  <body>
    <header>
      <h1>Calendar App</h1>
    </header>
    
    <section class="clock-container">
      <div id="clock"></div>
    </section>

    <section class="calendar">
      <div class="nav-btn-container">
        <button class="nav-btn" id="prevMonthBtn">◀️</button>
        <h2 id="monthYear"></h2>
        <button class="nav-btn" id="nextMonthBtn">▶️</button>
      </div>

      <div class="calendar-grid" id="calendar"></div>
    </section>

    <!-- Modal: Add/Edit/Delete event -->
    <section class="modal" id="eventModal">
      <div class="modal-content">
        <div id="eventSelectorWrapper">
          <label for="eventSelector">
            <strong>Select Event:</strong>
          </label>
          <select name="" id="eventSelector">
            <option disabled selected>Choose Event...</option>
          </select>
        </div>

        <!-- Modal: Main Form -->
        <form method="post" id="eventForm">
          <input type="hidden" name="action" id="formAction" value="add">
          <input type="hidden" name="event_id" id="eventId">

          <label for="courseName">Course Title:</label>
          <input type="text" name="course_name" id="courseName" required>

          <label for="instructorName">Instructor Name:</label>
          <input type="text" name="instructor_name" id="instructorName" required>

          <label for="startDate">Start Date:</label>
          <input type="date" name="start_date" id="startDate" required>

          <label for="endDate">End Date:</label>
          <input type="date" name="end_date" id="endDate" required>

          <label for="startTime">Start Time:</label>
          <input type="time" name="start_time" id="startTime" required>

          <label for="endTime">End Time:</label>
          <input type="time" name="end_time" id="endTime" required>

          <button type="submit">Save 💾</button>
        </form>

        <!-- Modal: Delete Form -->
        <form method="post" onsubmit="return confirm('Do you really want to delete this event?')">
          <input type="hidden" name="action" value="delete">
          <input type="hidden" name="event_id" id="deleteEventId">
          <button type="submit" class="submit-btn">Delete 🗑️</button>
        </form>

        <!-- Modal: Close Button -->
        <button type="button" id="cancel" class="submit-btn">Cancel ❌</button>
      </div>
    </section>
  </body>

  <script>
    const events = <?= json_encode($eventsFromDB, JSON_UNESCAPED_UNICODE); ?>
  </script>

</html>