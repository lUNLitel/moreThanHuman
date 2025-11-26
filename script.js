// Quiz logic
(function(){
  const quiz = document.getElementById('quiz');
  const result = document.getElementById('quizResult');
  if (!quiz) return;
  
  const buttons = quiz.querySelectorAll('button[data-answer]');
  
  // Add hover animations
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(8px)';
      this.style.transition = 'all 0.3s ease';
    });
    
    btn.addEventListener('mouseleave', function() {
      if (!this.classList.contains('selected')) {
        this.style.transform = 'translateX(0)';
      }
    });
  });
  
  // Quiz answer logic - page-specific responses
  const quizResponses = {
    bear: {
      correct: 'c',
      messages: {
        c: "✓ Correct — keep distance, secure food, and notify staff. Prioritize safety and avoid direct interaction.",
        b: "✗ Not ideal — approaching the bear can be risky. The safer choice is to keep distance and notify staff.",
        a: "✗ Incorrect — getting close to wildlife is dangerous for you and the animal."
      }
    },
    salmon: {
      correct: 'a',
      messages: {
        a: "✓ Correct — salmon bring vital marine nutrients from the ocean to inland ecosystems, enriching forests and streams.",
        b: "✗ Incorrect — salmon benefit far more than just fisheries; they're essential to entire ecosystems.",
        c: "✗ Incorrect — salmon actually support and strengthen freshwater ecosystems through nutrient cycling."
      }
    },
    deer: {
      correct: 'a',
      messages: {
        a: "✓ Correct — deer play crucial roles in maintaining plant diversity and supporting predator populations.",
        b: "✗ Incorrect — deer are vital ecosystem members that influence forest health and support other species.",
        c: "✗ Incorrect — deer's ecological importance extends far beyond hunting; they shape entire landscapes."
      }
    }
  };

  // Detect current page
  const pageTitle = document.getElementById('pageTitle');
  const currentPage = pageTitle ? pageTitle.textContent.toLowerCase() : 'bear';
  const pageConfig = quizResponses[currentPage] || quizResponses.bear;

  quiz.addEventListener('click', function(e){
    const btn = e.target.closest('button[data-answer]');
    if (!btn) return;

    // Remove previous selections
    buttons.forEach(b => {
      b.classList.remove('selected', 'correct', 'incorrect');
      b.style.transform = 'translateX(0)';
    });

    const answer = btn.getAttribute('data-answer');
    btn.classList.add('selected');

    // Add animation
    btn.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
      btn.style.animation = '';
    }, 500);

    const message = pageConfig.messages[answer];
    const isCorrect = answer === pageConfig.correct;

    if (isCorrect) {
      btn.classList.add('correct');
      result.style.color = "green";
    } else {
      btn.classList.add('incorrect');
      result.style.color = answer === 'b' ? "#b45f00" : "crimson";
    }

    result.textContent = message;
    result.style.fontWeight = "600";
    result.style.animation = 'fadeIn 0.5s ease';
  });
  
  // Make flip cards keyboard accessible: toggle rotate on Enter/Space
  const flipButtons = document.querySelectorAll('.flip .flip-inner');
  flipButtons.forEach(btn=>{
    btn.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.style.transform = this.style.transform === 'rotateY(180deg)' ? 'none' : 'rotateY(180deg)';
      }
    });
  });
})();