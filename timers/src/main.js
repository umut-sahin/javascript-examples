let passedSeconds = 0;

const timer = setInterval(() => {
  passedSeconds++;
  console.log(`${passedSeconds} seconds passed.`);

  if (passedSeconds === 3) {
    clearInterval(timer);
  }
}, 1000);
