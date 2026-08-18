function initNav(){
    const hamburger = document.querySelector('.hamburger')
    const nav_links = document.querySelector('.nav-links')
    if (!hamburger || !nav_links) return
    hamburger.addEventListener('click', () => {
        nav_links.classList.toggle('open')
    })
    nav_links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav_links.classList.remove('open')
        })
    })
}

function markActiveNav(){
    const page = window.location.pathname.split('/').pop() || 'index.html'
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href')
        if (href === page || (page === '' && href === 'index.html')){
            link.classList.add('active')
        }
        else{
            link.classList.remove('active')
        }
    })
}

function initCarousel(){
    const slides = document.querySelectorAll('.carousel-slide')
    const dots = document.querySelectorAll('.dot')
    if (!slides.length) return

    let current = 0
    let autoInterval = null

    function goTo(index){
        slides[current].classList.remove('active')
        dots[current].classList.remove('active')
        current = (index + slides.length) % slides.length
        slides[current].classList.add('active')
        dots[current].classList.add('active')
    }

    function startAuto(){
        interval = setInterval(() => goTo(current + 1), 5000)
    }

    function resetAuto(){
        clearInterval(interval)
        startAuto()
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i)
            resetAuto()
        })
    })
    startAuto()
}

function initForm() {
    const form = document.getElementById('registerForm')
    if (!form) return

    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const age = document.getElementById('age')
    const gender = document.querySelectorAll('input[name="gender"]')
    const troop = document.getElementById('fav-troop')
    const reason = document.getElementById('join-motivation')
    const dialog = document.getElementById('dialog-box')
    const msg = document.getElementById('error-message')

    function showError(input, id, text){
        if (input) input.classList.add('invalid')
        const el = document.getElementById(id)
        el.innerText = text
        el.classList.add('visible')
    }

    function clearError(input, id){
        if (input) input.classList.remove('invalid')
        const el = document.getElementById(id)
        el.innerText = ''
        el.classList.remove('visible')
    }

    function showDialog(text, success){
        msg.innerText = text
        if (success){
            dialog.classList.add('success')
        }
        else{
            dialog.classList.remove('success')
        }
        dialog.classList.add('show')
        setTimeout(() => {
            dialog.classList.remove('show')
        }, 3000)
    }

    name.addEventListener('input', () => clearError(name, 'name-error'))
    email.addEventListener('input', () => clearError(email, 'email-error'))
    age.addEventListener('input', () => clearError(age, 'age-error'))
    troop.addEventListener('change', () => clearError(troop, 'troop-error'))
    reason.addEventListener('input', () => clearError(reason, 'reason-error'))
    gender.forEach(input => {
        input.addEventListener('change', () => {
            const genderErr = document.getElementById('gender-error')
            genderErr.innerText = ''
            genderErr.classList.remove('visible')
        })
    })

    form.addEventListener('submit', e => {
        e.preventDefault()

        let valid = true

        clearError(name, 'name-error')
        let nameVal = name.value.trim()
        if (nameVal === ''){
            showError(name, 'name-error', 'Name cannot be empty.')
            valid = false
        }
        else if (nameVal.length < 3){
            showError(name, 'name-error', 'Name must be at least 3 characters.')
            valid = false
        }

        clearError(email, 'email-error')
        let emailVal = email.value.trim()
        let atPos = emailVal.indexOf('@')
        let lastAtPos = emailVal.lastIndexOf('@')
        let dotPos = emailVal.indexOf('.', atPos)
        if (emailVal === ''){
            showError(email, 'email-error', 'Email cannot be empty.')
            valid = false
        }
        else if (atPos === -1 || atPos !== lastAtPos || atPos === 0){
            showError(email, 'email-error', 'Email must contain one @ symbol.')
            valid = false
        }
        else if (dotPos === -1 || dotPos < atPos + 2 || dotPos === emailVal.length - 1){
            showError(email, 'email-error', 'Email domain is invalid.')
            valid = false
        }

        clearError(age, 'age-error')
        let ageVal = age.value.trim()
        if (ageVal === ''){
            showError(age, 'age-error', 'Age cannot be empty.')
            valid = false
        }
        else if (isNaN(ageVal) || ageVal !== String(parseInt(ageVal))){
            showError(age, 'age-error', 'Age must be a valid whole number.')
            valid = false
        }
        else if (parseInt(ageVal) < 13){
            showError(age, 'age-error', 'You must be at least 13 years old to join.')
            valid = false
        }

        const genderErr = document.getElementById('gender-error')
        let genderPicked = false
        gender.forEach(input => {
            if (input.checked){
                genderPicked = true
            }
        })
        if (!genderPicked){
            genderErr.innerText = 'Please select your gender.'
            genderErr.classList.add('visible')
            valid = false
        }
        else{
            genderErr.innerText = ''
            genderErr.classList.remove('visible')
        }

        clearError(troop, 'troop-error')
        if (troop.value === ''){
            showError(troop, 'troop-error', 'Please select your troop.')
            valid = false
        }

        clearError(reason, 'reason-error')
        let reasonVal = reason.value.trim()
        if (reasonVal === ''){
            showError(reason, 'reason-error', 'Reason cannot be empty.')
            valid = false
        }
        else if (reasonVal.length < 10){
            showError(reason, 'reason-error', 'Reason must be at least 10 characters.')
            valid = false
        }

        if (valid){
            showDialog('Welcome! Your registration was successful.', true)
            form.reset()
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 3000)
        }
        else{
            showDialog('Registration failed. Please check the form.', false)
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initNav()
    markActiveNav()
    initCarousel()
    initForm()
})