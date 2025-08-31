document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-btn");

  // Safety check
  if (!chatBox || !userInput || !sendButton) {
    console.error("One or more elements not found!");
    return;
  }

  // Bot Responses - Minimal & Exact
  const responses = {
    syllabus: `
      📚 <strong>BCA Syllabus (Core Subjects):</strong><br><br>
      • Programming in C<br>
      • C++<br>
      • Java<br>
      • Python<br>
      • Database Management (DBMS)<br>
      • Mathematics<br>
      • Accounts<br><br>
      <strong>Labs:</strong><br>
      • C & C++ Lab<br>
      • Java & Python Lab<br>
      • DBMS 
    `,

    faculty: `
      👨‍🏫 <strong>BCA Faculty:</strong><br><br>
      Our team includes experienced teachers in:<br>
      • Programming (C, C++, Java, Python)<br>
      • Database Systems<br>
      • Web Technologies<br>
    `,

    labs: `
      💻 <strong>There are 3 labs with high speed networks.</strong>
    `,

    projects: `
      🎯 <strong>There are 2 final year projects:</strong><br>
      • 1 Individual Project<br>
      • 1 Group Project
    `,

    admission: `
      📝 <strong>Admission Requirements:</strong><br><br>
      • 10+2 passed <br>
      • Minimum 50% marks <br>
      • Math or Computer Science preferred<br>
    `,

    placements: `
      💼 <strong>Placement is available.</strong>
    `,

    default: `
      I can help with:<br>
      • <strong>Syllabus</strong><br>
      • <strong>Courses</strong><br>
      • <strong>Faculty</strong><br>
      • <strong>Labs</strong><br>
      • <strong>Projects</strong><br>
      • <strong>Admission</strong><br>
      • <strong>Placements</strong><br><br>
      Try asking: <em>"How many labs?"</em> or <em>"Tell me about projects"</em>
    `
  };

  // Get current time
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Add message to chat
  function addMessage(message, isUser) {
    const msgDiv = document.createElement("div");
    msgDiv.className = isUser ? "user-message" : "bot-message";

    const content = document.createElement("div");
    content.innerHTML = message;

    const timestamp = document.createElement("div");
    timestamp.className = "timestamp";
    timestamp.textContent = getCurrentTime();

    msgDiv.appendChild(content);
    msgDiv.appendChild(timestamp);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Show typing indicator
  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "bot-typing";
    typing.id = "typing-indicator";
    typing.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Hide typing indicator
  function hideTyping() {
    const el = document.getElementById("typing-indicator");
    if (el) el.remove();
  }

  // Get bot response
  function getResponse(input) {
    const text = input.toLowerCase().trim();

    if (text.includes("syllabus") || text.includes("subjects")) return responses.syllabus;
    if (text.includes("course")) return responses.courses;
    if (text.includes("faculty") || text.includes("teacher")) return responses.faculty;
    if (text.includes("lab")) return responses.labs;
    if (text.includes("project")) return responses.projects;
    if (text.includes("admission") || text.includes("eligibility")) return responses.admission;
    if (text.includes("placement") || text.includes("job")) return responses.placements;

    // 🚫 No response for "events", "fest", etc. → falls to default
    return responses.default;
  }

  // Send message
  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = "";

    showTyping();
    setTimeout(() => {
      hideTyping();
      const reply = getResponse(message);
      addMessage(reply, false);
    }, 800);
  }

  // Event listeners
  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Focus input
  userInput.focus();
});