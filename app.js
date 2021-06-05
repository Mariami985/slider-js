const slidesContainer = document.querySelector('.slidesContainer')
const navigation = document.querySelectorAll('.navigation');

function axios (url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.status !== 200){
                    reject()
                }else {
                    resolve(response)
                }
            })
            .catch(() => {
                reject()
            })
    })
}
axios ('https://us-central1-js04-b4877.cloudfunctions.net/api/slides')
.then (response => response.json())
.then(data => {
    data.forEach(item => {
        let slide = document.createElement('div');
        slide.innerText = item.title;
        slide.className = 'slides'
        slide.style.background = 'url('+item.image+') center center no-repeat';
        slidesContainer.appendChild(slide);
    })
    slidesContainer.style.width = (data.length * 500) + 'px';
    let currentSlide = 0;
    let slideCount = data.length;


    navigation.forEach(button => {
    button.addEventListener('click',(event) => {
        if(event.target.classList.contains('navigation-prev')) {
            currentSlide -= 1
            if (currentSlide < 0) {
                currentSlide = slideCount - 1;
            }
        }else{
            currentSlide += 1
            if (currentSlide > slideCount - 1) {
                currentSlide = 0;
            }
        }
        slidesContainer.style.left = '-' + (currentSlide * 500) + 'px';
    })
    })
 })

.catch(error => console.log(error))

setInterval(()=> {
    document.querySelector('.navigation-next').click()
},6000)