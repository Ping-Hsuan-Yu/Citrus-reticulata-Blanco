(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme')

        if (!themeSwitcher) {
            return
        }

        const themeSwitcherText = document.querySelector('#bd-theme-text')
        const activeThemeIcon = document.querySelector('.theme-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        })

        btnToActive.classList.add('active')
        btnToActive.setAttribute('aria-pressed', 'true')
        activeThemeIcon.setAttribute('href', svgOfActiveBtn)
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

        if (focus) {
            themeSwitcher.focus()
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    setStoredTheme(theme)
                    setTheme(theme)
                    showActiveTheme(theme, true)
                })
            })
    })
})()


const handleOnChange = () => {
    let orangeValue = document.getElementById("orange").value
    let tomatoValue = document.getElementById("tomato").value
    if (!isNaN(orangeValue) && !isNaN(tomatoValue)) {
        document.getElementById("orange-total").innerText = (Number(orangeValue) * 400).toLocaleString()
        document.getElementById("tomato-total").innerText = (Number(tomatoValue) * 120).toLocaleString()
        document.getElementById("sum").innerText = (Number(orangeValue) * 400 + Number(tomatoValue) * 120).toLocaleString()
    }
}

const copyText = (element) => {
    const textarea = document.createElement("textarea");
    textarea.value = element.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        Toastify({
            text: "成功複製帳號",
            className: "rounded shadow-sm",
            style: {
                background: "linear-gradient(90deg, rgba(255,165,0,0.7) 0%, rgba(255,72,0,0.7) 100%)",
            }
        }).showToast();
    } catch (err) {
        console.error("Unable to copy text");
    } finally {
        document.body.removeChild(textarea);
    }
}

const handleSummit = () => {
    sent_redirect = true
    Toastify({
        text: "已成功提交訂單",
        className: "rounded shadow-sm",
        style: {
            background: "linear-gradient(90deg, rgba(255,165,0,0.7) 0%, rgba(255,72,0,0.7) 100%)",
        },
        duration: "-1",
        close: true,
    }).showToast();
}
