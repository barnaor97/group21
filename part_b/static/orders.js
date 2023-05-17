 // JavaScript code to toggle the visibility of the rolling message container
    window.addEventListener('scroll', function() {
      const rollingMessageContainer = document.getElementById('rollingMessageContainer');
      const rollingMessage = document.getElementById('rollingMessage');
      const rollingMessageRect = rollingMessage.getBoundingClientRect();

      // Add the "visible" class if the rolling message is within the viewport
      if (rollingMessageRect.top < window.innerHeight && rollingMessageRect.bottom >= 0) {
        rollingMessageContainer.classList.add('visible');
      } else {
        rollingMessageContainer.classList.remove('visible');
      }
    });