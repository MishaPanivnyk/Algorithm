const CounterHandler = () => {
  let totalWorkTime = 0;
  let totalRestTime = 0;
  let currentDuration = 0;
  let seconds = 0;
  let timelineRef = null;
  let pausedSeconds = 0;
  let selectedActivity = "Робота";
  const timeList = [];
  let listNumber = 1;
  const activitySelect = document.getElementById("activitySelect");
  const currentDurationSpan = document.getElementById("currentDuration");
  const totalWorkTimeSpan = document.getElementById("totalWorkTime");
  const totalRestTimeSpan = document.getElementById("totalRestTime");
  const timeListUl = document.getElementById("timeList");

  const startHandler = () => {
    if (!timelineRef) {
      seconds = pausedSeconds;
      pausedSeconds = 0;
      currentDuration = seconds;
      timelineRef = setInterval(() => {
        seconds++;
        currentDuration++;
        currentDurationSpan.innerText = currentDuration;
      }, 1000);
    }
  };

  const pauseHandler = () => {
    clearInterval(timelineRef);
    timelineRef = null;
    pausedSeconds = seconds;
  };

  const stopHandler = () => {
    clearInterval(timelineRef);
    timelineRef = null;
    if (selectedActivity === "Робота") {
      totalWorkTime += seconds;
      totalWorkTimeSpan.innerText = totalWorkTime;
      timeList.push(`${listNumber} Тривалість роботи - ${seconds} с`);
    } else {
      totalRestTime += seconds;
      totalRestTimeSpan.innerText = totalRestTime;
      timeList.push(`${listNumber} Тривалість відпочинку - ${seconds} с`);
    }
    listNumber++;
    seconds = 0;
    currentDuration = 0;
    timeListUl.innerHTML = timeList.map((item) => `<li>${item}</li>`).join("");
  };

  const activitySelectHandler = (e) => {
    selectedActivity = e.target.value;
    currentDuration = 0;
    currentDurationSpan.innerText = currentDuration;
  };

  document
    .getElementById("startButton")
    .addEventListener("click", startHandler);
  document
    .getElementById("pauseButton")
    .addEventListener("click", pauseHandler);
  document.getElementById("stopButton").addEventListener("click", stopHandler);
  activitySelect.addEventListener("change", activitySelectHandler);
};

CounterHandler();
