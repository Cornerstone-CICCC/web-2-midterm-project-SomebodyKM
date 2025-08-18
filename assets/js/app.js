// burger menu
const burgerBtn = document.querySelector('.burger-icon')
const burgerMenu = document.querySelector('.mobile-header nav')

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active')
    burgerMenu.classList.toggle('active')
})

// fetching data
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njg5NjBlYjZlYTJhY2I0ZjFiNjZiMDY0NWRjZGY4MCIsIm5iZiI6MTc1NDgwMzg0Ny4xMzIsInN1YiI6IjY4OTgyZTg3NzRlMjQwYzNiYTZkNjdiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E7Uu4Nc4XyHfAbnAo2he5Iz2Oy5N-OfJ6m8V9KAddZo'
    }
};

const getTrending = async (type) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const getNowPlaying = async (type) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/now_playing?language=en-US&page=1`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const getTopRated = async (type) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=1`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const getUpcoming = async (type) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/upcoming?language=en-US&page=1`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const getPopular = async (type) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const getAiringToday = async () => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const getOnTheAir = async () => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const getSearchData = async (query) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options)
        const data = await res.json()
        const filtered = data.results.filter(result => result.media_type !== "person")

        return filtered.length > 0 ? filtered : data.results
    } catch (err) {
        console.error(err)
    }
}

async function getDetails(type, id) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos&language=en-US`, options)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

// build banner 
function buildBanner(arr, section) {
    section.innerHTML = ''

    arr.forEach((element, index) => {
        const bannerContainer = document.createElement('div')
        const banner = document.createElement('img')
        const bannerTitle = document.createElement('h1')
        const basedUrl = 'https://image.tmdb.org/t/p/w1280'

        bannerContainer.classList.add('banner')
        if (index === 0) bannerContainer.classList.add('active')

        banner.setAttribute('src', basedUrl + element.backdrop_path)
        bannerTitle.textContent = element.title || element.name

        bannerContainer.appendChild(banner)
        bannerContainer.appendChild(bannerTitle)
        section.appendChild(bannerContainer)
    })

    let current = 0
    const banners = section.querySelectorAll('.banner')

    setInterval(() => {
        banners[current].classList.remove('active')
        current = (current + 1) % banners.length
        banners[current].classList.add('active')
    }, 5000)
}

// build cards
function buildCards(arr, section, type) {
    arr.forEach(element => {
        const card = document.createElement('div')
        const poster = document.createElement('img')
        const title = document.createElement('p')
        const basedUrl = 'https://image.tmdb.org/t/p/w185'
        card.classList.add('card')
        poster.setAttribute('src', basedUrl + element.poster_path)
        title.textContent = element.title || element.name
        card.appendChild(poster)
        card.appendChild(title)
        section.appendChild(card)

        card.addEventListener('click', async () => {
            const details = await getDetails(type, element.id)
            buildModal(details)
        })
    });
}

// prev next scroll
function enableButtonScroll(sectionElement) {
    if (!sectionElement) return

    const wrapper = sectionElement.closest('.slider')
    const prevBtn = wrapper.querySelector('.prev')
    const nextBtn = wrapper.querySelector('.next')

    prevBtn.addEventListener('click', () => {
        sectionElement.scrollBy({ left: -300, behavior: 'smooth' })
    })

    nextBtn.addEventListener('click', () => {
        sectionElement.scrollBy({ left: 300, behavior: 'smooth' })
    })
}

// toggle theme 
const desktopThemeToggle = document.querySelector('.theme-toggle')
const mobileThemeToggle = document.querySelector('.mobile-theme-toggle')

function applyTheme(isDark) {
    const movieBgc = document.querySelector('.movie-section')
    const seriesBgc = document.querySelector('.series-section')
    const bannerH1 = document.querySelectorAll('.banner h1')
    const sectionContainer = document.querySelectorAll('.section-container')
    const prevBtn = document.querySelectorAll('.prev')
    const nextBtn = document.querySelectorAll('.next')
    const aboutSection = document.querySelector('.about-info')
    const modalOverlay = document.querySelector('.modal-overlay')
    const modalBtn = document.querySelector('.close-modal-btn')

    const desktopIcon = desktopThemeToggle?.querySelector('i')
    const mobileIcon = mobileThemeToggle?.querySelector('i')

    if (isDark) {
        // Dark mode
        desktopIcon?.classList.replace('fa-sun', 'fa-moon')
        mobileIcon?.classList.replace('fa-sun', 'fa-moon')

        movieBgc?.classList.add('dark')
        seriesBgc?.classList.add('dark')
        aboutSection?.classList.add('dark')
        modalOverlay?.classList.add('dark')
        modalBtn?.classList.add('dark')

        bannerH1.forEach(e => e.classList.add('dark'))
        sectionContainer.forEach(e => e.classList.add('dark'))
        prevBtn.forEach(e => e.classList.add('dark'))
        nextBtn.forEach(e => e.classList.add('dark'))
    } else {
        // Light mode
        desktopIcon?.classList.replace('fa-moon', 'fa-sun')
        mobileIcon?.classList.replace('fa-moon', 'fa-sun')

        movieBgc?.classList.remove('dark')
        seriesBgc?.classList.remove('dark')
        aboutSection?.classList.remove('dark')
        modalOverlay?.classList.add('dark')
        modalBtn?.classList.remove('dark')

        bannerH1.forEach(e => e.classList.remove('dark'))
        sectionContainer.forEach(e => e.classList.remove('dark'))
        prevBtn.forEach(e => e.classList.remove('dark'))
        nextBtn.forEach(e => e.classList.remove('dark'))
    }
}


function themeToggle() {
    const isDark = localStorage.getItem('theme') === 'dark'
    const newTheme = isDark ? 'light' : 'dark'

    localStorage.setItem('theme', newTheme)

    applyTheme(newTheme === 'dark')
}

desktopThemeToggle?.addEventListener('click', themeToggle)
mobileThemeToggle?.addEventListener('click', e => {
    e.preventDefault()
    themeToggle()
})

// search bar showing
const searchSection = document.querySelectorAll('.search-section')

searchSection.forEach(section => {
    const btn = section.querySelector('.search-btn')
    const input = section.querySelector('.search-input')

    btn.addEventListener('click', e => {
        e.stopPropagation()

        if (!section.classList.contains('active')) {
            section.classList.add('active')
            input.focus()
            btn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        } else {
            input.value = ''
            input.focus()

        }
    })

    input.addEventListener('click', e => {
        e.stopPropagation()
    })

    document.addEventListener('click', e => {
        if (!section.contains(e.target)) {
            section.classList.remove('active')
            btn.innerHTML = '<i class="fas fa-search"></i>'
        }
    })
})

// search form
function searchResults(page, results, userInput) {

    const modalOverlay = document.querySelector('.modal-overlay')
    const modalDiv = document.querySelector('.modal-div')

    page.innerHTML = ''
    if (modalOverlay) modalDiv.appendChild(modalOverlay)
    page.appendChild(modalDiv)

    const heading = document.createElement('h1')
    heading.textContent = `Results for: ${userInput}`
    page.appendChild(heading)

    if (!results || !results.length) {
        const notFound = document.createElement('p')
        notFound.textContent = 'No results found.'
        page.appendChild(notFound)
    }

    const resultsGrid = document.createElement('div')
    resultsGrid.classList.add('search-results')

    results.forEach(result => {
        const card = document.createElement('div')
        card.classList.add('card')
        const poster = document.createElement('img')
        const title = document.createElement('p')
        const basedUrl = 'https://image.tmdb.org/t/p/w185'

        poster.setAttribute('src', result.poster_path ? basedUrl + result.poster_path : 'https://placehold.co/185x278?text=No+Image')
        title.textContent = `${result.title || result.name} (${result.media_type})`

        card.appendChild(poster)
        card.appendChild(title)
        resultsGrid.appendChild(card)

        card.addEventListener('click', async () => {
            try {
                let type = result.media_type
                if (type === 'multi') {
                    type = result.title ? 'movie' : 'tv'
                }

                if (type !== 'movie' && type !== 'tv') return

                const details = await getDetails(type, result.id)


                buildModal(details)
            } catch (err) {
                console.error(err)
            }
        })
    })
    page.appendChild(resultsGrid)
}

const currentPage = window.location.pathname.split("/").pop()

const searchForm = document.querySelectorAll('.search-section')
const pageContent = document.querySelector('main')


searchForm.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const input = form.querySelector('.search-input')
        const userInput = input.value.trim()
        if (!userInput) return

        if (currentPage === 'about.html') {
            window.location.href = `index.html?query=${encodeURIComponent(userInput)}`

        } else {

            const searchData = await getSearchData(userInput)
            searchResults(pageContent, searchData, userInput)
        }

        form.reset()
    })
})

window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    if (query && (currentPage === "index.html" || currentPage === "series.html")) {
        const searchData = await getSearchData(query);
        searchResults(pageContent, searchData, query);
    }
})

// build modal
const mainSection = document.querySelector('main')

const modalDiv = document.createElement('div')
modalDiv.classList.add('modal-div')

const modalOverlay = document.createElement('div')
modalOverlay.classList.add('modal-overlay')
modalDiv.appendChild(modalOverlay)

mainSection.appendChild(modalDiv)

window.addEventListener('click', (e) => {
    if (e.target === modalDiv) {
        modalDiv.style.display = 'none'
        modalOverlay.innerHTML = ''
    }
})

function buildModal(data) {

    modalOverlay.innerHTML = ''

    const closeBtn = document.createElement('span')
    closeBtn.classList.add('close-modal-btn')
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'

    if (localStorage.getItem('theme') === 'dark') {
        closeBtn.classList.add('dark')
        modalOverlay.classList.add('dark')
    } else {
        modalOverlay.classList.remove('dark')
    }

    closeBtn.addEventListener('click', () => {
        modalDiv.style.display = 'none'
        modalOverlay.innerHTML = ''
    })

    const content = document.createElement('div')
    content.classList.add('modal-content')

    const trailerKey = data.videos?.results?.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
    )?.key
    const trailerDiv = document.createElement('div')
    trailerDiv.classList.add('modal-trailer')

    if (trailerKey) {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('src', `https://www.youtube.com/embed/${trailerKey}`)
        iframe.setAttribute('frameborder', '0')
        iframe.setAttribute('allowfullscreen', '')
        trailerDiv.appendChild(iframe)
    } else {
        trailerDiv.textContent = 'No trailer available.'
    }

    const modalInfo = document.createElement('div')
    modalInfo.classList.add('modal-info')

    const addInfo = (label, value) => {
        const p = document.createElement('p')
        p.innerHTML = `<strong>${label}:</strong> ${value}`
        modalInfo.appendChild(p)
    }

    addInfo('Overview', data.overview || 'No overview available.')

    const rating = data.vote_average ? data.vote_average.toFixed(1) : 'N/A'
    const votes = data.vote_count ? `${data.vote_count.toLocaleString()} votes` : 'No votes'

    addInfo('Rating', `⭐${rating} (${votes})`)

    addInfo('Genres', data.genres ? data.genres.map(g => g.name).join(', ') : 'N/A')
    addInfo('Release Date', data.release_date || data.first_air_date || 'Unknown')

    content.appendChild(trailerDiv)
    content.appendChild(modalInfo)

    modalOverlay.appendChild(closeBtn)
    modalOverlay.appendChild(content)

    modalDiv.style.display = 'flex'
}

// get datas
const page = window.location.pathname

if (page.includes("index.html")) {
    document.addEventListener('DOMContentLoaded', async () => {
        const trendingMovieSection = document.querySelector('.trending-movie')
        const nowPlayingMovieSection = document.querySelector('.now-playing-movie')
        const topRatedMovieSection = document.querySelector('.top-rated-movie')
        const upcomingReleasesMovieSection = document.querySelector('.upcoming-releases-movie')
        const bannerSection = document.querySelector('.movie-banner')
        const trending = await getTrending('movie')
        const nowPlaying = await getNowPlaying('movie')
        const topRated = await getTopRated('movie')
        const upcomingReleases = await getUpcoming('movie')
        const popular = await getPopular('movie')

        buildBanner(popular.results, bannerSection)
        buildCards(trending.results, trendingMovieSection, 'movie')
        buildCards(nowPlaying.results, nowPlayingMovieSection, 'movie')
        buildCards(topRated.results, topRatedMovieSection, 'movie')
        buildCards(upcomingReleases.results, upcomingReleasesMovieSection, 'movie')

            ;[
                trendingMovieSection,
                nowPlayingMovieSection,
                topRatedMovieSection,
                upcomingReleasesMovieSection
            ].forEach(enableButtonScroll)

        const savedTheme = localStorage.getItem('theme') || 'light'
        applyTheme(savedTheme === 'dark')
    })
} else if (page.includes("series.html")) {
    document.addEventListener('DOMContentLoaded', async () => {
        const trendingSeriesSection = document.querySelector('.trending-series')
        const nowPlayingSeriesSection = document.querySelector('.now-playing-series')
        const topRatedSeriesSection = document.querySelector('.top-rated-series')
        const upcomingReleasesSeriesSection = document.querySelector('.upcoming-releases-series')
        const bannerSection = document.querySelector('.series-banner')
        const trending = await getTrending('tv')
        const nowPlaying = await getAiringToday()
        const topRated = await getTopRated('tv')
        const upcomingReleases = await getOnTheAir()
        const popular = await getPopular('tv')

        buildBanner(popular.results, bannerSection)
        buildCards(trending.results, trendingSeriesSection, 'tv')
        buildCards(nowPlaying.results, nowPlayingSeriesSection, 'tv')
        buildCards(topRated.results, topRatedSeriesSection, 'tv')
        buildCards(upcomingReleases.results, upcomingReleasesSeriesSection, 'tv')

            ;[
                trendingSeriesSection,
                nowPlayingSeriesSection,
                topRatedSeriesSection,
                upcomingReleasesSeriesSection
            ].forEach(enableButtonScroll)

        const savedTheme = localStorage.getItem('theme') || 'light'
        applyTheme(savedTheme === 'dark')
    })
} else if (page.includes("about.html")) {
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        applyTheme(savedTheme === 'dark')
    })
}

