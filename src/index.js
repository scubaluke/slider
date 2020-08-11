function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('no slider passed in');
  }
  // variables for working with
  let current;
  let prev;
  let next;
  // select the elements for the slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log({ current, prev, next });
  }
  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }
  function move(direction) {
    // first stip classes off slides
    const clasesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...clasesToRemove);
    current.classList.remove(...clasesToRemove);
    next.classList.remove(...clasesToRemove);
    if (direction === 'back') {
      // make a new array of the new values, and destructure them over and into the prev, current and next variables
      [prev, current, next] = [
        // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      // get the next slide, or if its at the end, loop around and get the first slide
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    applyClasses();
  }
  startSlider();
  applyClasses();

  // event listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
