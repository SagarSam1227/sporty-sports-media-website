function updateBodyBackground(isDarkmode) {
    const body = document.body;
    if (isDarkmode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  return updateBodyBackground;