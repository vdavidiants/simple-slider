let dataSlider = []
const sliderContainer = document.getElementById('slider-container')
let slideBlock = `
    <h3>@@sliderName</h3>
`
async function getData() {
  await fetch('../mocks/dataSlider.json')
    .then((res) => res.json())
    .then(({ data }) => {
      dataSlider = data
    })
    .catch((err) => console.dir(err))
  if (dataSlider.length) {
    let indexActiveSlide = Math.ceil(dataSlider.length / 2)
    dataSlider.forEach((slide, index) => {
      const el = sliderContainer.appendChild(document.createElement('div'))
      el.classList.add('slide');
      el.style.backgroundImage = `url(${slide.url})`;
      el.innerHTML = slideBlock.replace('@@sliderName', slide.value);
      if (index === (indexActiveSlide - 1)) {
        el.classList.add('active');
      }
    }) 
  }
}
function setHandlers() {
  const slides = document.querySelectorAll('.slide')

  for (const slide of slides) {
    slide.addEventListener('click', () => {
      clearActiveClasses()
  
      slide.classList.add('active')
    })
  }
  
  function clearActiveClasses() {
    slides.forEach((slide) => {
      slide.classList.remove('active')
    })
  }
}

async function initScript () {
  await getData()
  setHandlers()
}

initScript()
