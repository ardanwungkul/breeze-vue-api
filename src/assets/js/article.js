export function setupCarousel() {
    let nextDom = document.getElementById('next')
    let prevDom = document.getElementById('prev')
    let carouselDom = document.querySelector('.carousel')

    if (!carouselDom) {
        console.error('Carousel element not found')
        return
    }

    let SliderDom = carouselDom.querySelector('.list')
    let thumbnailBorderDom = carouselDom.querySelector('.thumbnail')
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item')
    let timeDom = carouselDom.querySelector('.time')

    if (
        !nextDom ||
        !prevDom ||
        !SliderDom ||
        !thumbnailBorderDom ||
        !thumbnailItemsDom
    ) {
        console.error('One or more DOM elements not found')
        return
    }

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0])

    let timeRunning = 1000
    let timeAutoNext = 7000

    nextDom.onclick = function () {
        showSlider('next')
    }

    prevDom.onclick = function () {
        showSlider('prev')
    }

    let runTimeOut
    let runNextAuto = setTimeout(() => {
        nextDom.click()
    }, timeAutoNext)

    function showSlider(type) {
        let SliderItemsDom = SliderDom.querySelectorAll('.list .item')
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item')

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0])
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0])
            carouselDom.classList.add('next')
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1])
            thumbnailBorderDom.prepend(
                thumbnailItemsDom[thumbnailItemsDom.length - 1],
            )
            carouselDom.classList.add('prev')
        }

        clearTimeout(runTimeOut)
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next')
            carouselDom.classList.remove('prev')
        }, timeRunning)

        clearTimeout(runNextAuto)
        runNextAuto = setTimeout(() => {
            nextDom.click()
        }, timeAutoNext)
    }
}
