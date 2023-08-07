function updateBodyBackground(isDarkmode: boolean) {
    const body = document.body;
    if (isDarkmode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
  

  export default updateBodyBackground;