// Глобальные функции
function toggleMenu() {
    const menuIcon = document.querySelector(".menu-icon");
    const menuDropdown = document.querySelector(".menu-dropdown");
    if (menuIcon && menuDropdown) {
        menuIcon.classList.toggle("active");
        menuDropdown.classList.toggle("active");
    }
}

function toggleSection(event) {
    const section = event.target.parentElement;
    if (section) {
        section.classList.toggle("active");
    }
}

// Основной скрипт выполняется после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", async function (event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (!name || !email || !message) {
                alert("Все поля обязательны!");
                return;
            }

            try {
                const response = await fetch("https://6a17-185-244-159-19.ngrok-free.app/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                });

                const result = await response.json();
                alert(result.success || result.error);
            } catch (error) {
                console.error("Ошибка при отправке формы:", error);
                alert("Ошибка при отправке. Проверьте соединение с сервером.");
            }
        });
    } else {
        console.error("Кнопка отправки не найдена. Проверьте ID 'submitBtn'.");
    }
});


particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100, /* Количество частиц */
            "density": { "enable": true, "value_area": 800 } /* Плотность */
        },
        "color": { "value": "#76c7c0" }, /* Цвет частиц */
        "shape": {
            "type": "circle", /* Форма частиц */
            "stroke": { "width": 1, "color": "#ffffff" }
        },
        "opacity": {
            "value": 0.6,
            "random": true
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true, /* Включить соединения между частицами */
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2, /* Скорость движения */
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab" /* Частицы реагируют на курсор */
            },
            "onclick": {
                "enable": true,
                "mode": "push" /* Частицы разлетаются при клике */
            }
        },
        "modes": {
            "grab": { "distance": 200, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true /* Улучшенная чёткость для ретина-экранов */
});






        function loadMarkdown(section) {
            fetch(`law/${section}.md`)
                .then(response => response.text())
                .then(text => {
                    const converter = new showdown.Converter();
                    document.getElementById("content").innerHTML = converter.makeHtml(text);
                })
                .catch(error => console.error("Ошибка загрузки:", error));
        }

        document.addEventListener("DOMContentLoaded", () => loadMarkdown("confidentiality"));

    function loadMarkdown(section) {
        fetch(`law/${section}.md`)
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка загрузки ${section}.md`);
                return response.text();
            })
            .then(text => {
                const converter = new showdown.Converter();
                document.getElementById("content").innerHTML = converter.makeHtml(text);
            })
            .catch(error => console.error("Ошибка:", error));
    }

    // ✅ Загружаем первый раздел сразу после загрузки страницы  
    window.onload = function() {
        setTimeout(() => loadMarkdown("point1"), 100); // Короткая задержка на 100мс для корректной загрузки
    };
