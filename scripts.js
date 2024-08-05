document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let isRunning = false;
    let isWorkMode = true;
    const workDuration = 25 * 60;
    const breakDuration = 5 * 60;
    let timeLeft = workDuration;

    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const workButton = document.getElementById('work');
    const breakButton = document.getElementById('break');

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert(isWorkMode ? 'Time for a break!' : 'Back to work!');
                switchMode();
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        timeLeft = isWorkMode ? workDuration : breakDuration;
        updateDisplay();
    }

    function switchMode() {
        isWorkMode = !isWorkMode;
        timeLeft = isWorkMode ? workDuration : breakDuration;
        updateDisplay();
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    workButton.addEventListener('click', () => {
        if (!isWorkMode) {
            switchMode();
        }
    });
    breakButton.addEventListener('click', () => {
        if (isWorkMode) {
            switchMode();
        }
    });

    updateDisplay();
});
