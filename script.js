let today = new Date();

// const offset = -3; // UTC-3 (horário de Brasília)
// today.setHours(today.getHours() + offset);

console.log(today);
console.log(today.getFullYear());

let selectedDate = null;
let selectedYear = null;
let isFirstInit = true;

const events = {
    "2025-08-03": {
        title: "Ensaio",
        description: "Ensaio para o louvorzão",
        hour: "19h30",
        presence: "6/8",
        numberOfSongs: "4",
    },
    "2025-08-16": {
        title: "Louvorzão",
        hour: "19h",
        description: "",
        presence: "5/9",
        numberOfSongs: "10",
    },
    "2025-08-17": {
        title: "Domingo",
        description: "Banda chegar as 17h para ensaio",
        hour: "19h",
        presence: "8/10",
        numberOfSongs: "7",
    },
    "2025-08-27": {
        title: "Ensaio Especial",
        description: "",
        hour: "20h",
        presence: "6/8",
        numberOfSongs: "4",
    },
    "2025-08-28": {
        title: "Vigília",
        description: "Chegar as 21h para organizar o local",
        hour: "22h30",
        presence: "4/8",
        numberOfSongs: "8",
    },
    "2025-10-31": {
        title: "Aniversario do alysson",
        description: "Chegar as 21h para organizar o local",
        hour: "22h30",
        presence: "4/8",
        numberOfSongs: "8",
    },
    "2025-09-01": {
        title: "Culto",
        description: "Chegar as 21h para organizar o local",
        hour: "22h30",
        presence: "4/8",
        numberOfSongs: "8",
    },
    "2025-09-15": {
        title: "noite de talentos",
        description: "Chegar as 21h para organizar o local",
        hour: "22h30",
        presence: "4/8",
        numberOfSongs: "8",
    },
};

function generateCalendar(year, month) {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    monthYear.textContent = `${months[month]} de ${year}`;
    calendar.innerHTML = "";

    // Add day headers
    daysOfWeek.forEach((day) => {
        const dayHeader = document.createElement("div");
        dayHeader.classList.add("day-header");
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    const firstDay = new Date(year, month, 1);

    console.log(firstDay);

    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Calcular dias do mês anterior
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDate = new Date(prevYear, prevMonth + 1, 0);
    const daysInPrevMonth = prevMonthDate.getDate();

    // Calcular dias do próximo mês
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    // Total de células necessárias (6 semanas × 7 dias)
    const totalCells = 42;
    let dayCounter = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < totalCells; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");

        let dayNumber;
        let dateStr;
        let isCurrentMonth = true;

        if (i < startingDayOfWeek) {

            // Dias do mês anterior
            dayNumber = daysInPrevMonth - (startingDayOfWeek - 1 - i);
            dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
            isCurrentMonth = false;
            dayElement.classList.add("other-month");
        } else if (dayCounter <= daysInMonth) {
            // Dias do mês atual
            dayNumber = dayCounter;
            dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
            dayCounter++;
        } else {
            // Dias do próximo mês
            dayNumber = nextMonthDay;
            dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(
                dayNumber
            ).padStart(2, "0")}`;
            nextMonthDay++;
            isCurrentMonth = false;
            dayElement.classList.add("other-month");
        }

        dayElement.textContent = dayNumber;
        dayElement.dataset.date = dateStr;
        dayElement.dataset.isCurrentMonth = isCurrentMonth;

        // Adiciona evento de clique apenas para dias do mês atual
        if (isCurrentMonth) {
            dayElement.addEventListener("click", () =>
                selectDate(dateStr, dayNumber)
            );
        } else {
            // Para dias de outros meses, navega para esse mês ao clicar
            dayElement.addEventListener("click", () => {
                if (i < startingDayOfWeek) {
                    // Clicou em dia do mês anterior
                    changeMonth(-1);
                    setTimeout(() => {
                        selectDate(dateStr, dayNumber);
                    }, 50);
                } else {
                    // Clicou em dia do próximo mês
                    changeMonth(1);
                    setTimeout(() => {
                        selectDate(dateStr, dayNumber);
                    }, 50);
                }
            });
        }
        calendar.appendChild(dayElement);
    }
    updateAllDayClasses();

    // Seleciona o dia atual automaticamente
    if (isFirstInit &&
        year === today.getFullYear() &&
        month === today.getMonth()) {
        const todayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        selectedDate = todayStr;
        selectDate(todayStr, today.getDate());
        isFirstInit = false;
    }
}

function updateAllDayClasses() {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const dayElements = document.querySelectorAll(".day[data-date]");

    dayElements.forEach((dayElement) => {
        const dateStr = dayElement.dataset.date;
        const isCurrentMonth = dayElement.dataset.isCurrentMonth === "true";

        // Limpa classes dinâmicas (mantém other-month se aplicável)
        dayElement.classList.remove("today", "selected", "has-event");

        // Aplica condições apenas para dias do mês atual
        if (isCurrentMonth) {
            if (todayStr === dateStr) {
                dayElement.classList.add("today");
                dayElement.classList.add("selected");
            }

            if (selectedDate && selectedDate === dateStr)
                dayElement.classList.add("selected");
            if (events[dateStr]) dayElement.classList.add("has-event");
        } else {
            // Para dias de outros meses, apenas verifica se tem eventos
            if (events[dateStr]) dayElement.classList.add("has-event");
        }
    });
}

function selectDate(dateStr, day) {
    selectedDate = dateStr;

    // Atualiza classes e detalhes do evento
    updateAllDayClasses();
    updateEventDetails(dateStr, day);
}

function updateEventDetails(dateStr, day) {
    const event = events[dateStr];

    // Preenche detalhes do evento ou mostra informações padrão
    document.querySelector(".date-day").textContent = day;

    // PERGUNTA PRO CHAT COMO ISSO FAZ SENTIDO
    document.querySelector(".date-month").textContent = today.toLocaleDateString("pt-BR", { month: "short" }).toUpperCase().slice(0, 3);

    let weekElement = document.querySelector(".date-week");
    const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    const dateObj = new Date(dateStr + "T00:00:00");

    console.log(dateStr);
    console.log(dateObj);

    let weekDay = dateObj.getDay();
    weekElement.textContent = daysOfWeek[weekDay];

    if (event) {
        document.querySelector(".event-title").textContent = event.title;
        document.querySelector(".date-hour").textContent = event.hour;

        let eventDate = new Date(dateStr);
        eventDate = eventDate.getTime();
        let diffText;

        const diffTime = eventDate - today.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if ((diffDays / 7) >= 1 || (diffDays / 7) < 2) {
            diffText = `Daqui a 1 semana`;
        }
        else if ((diffDays / 7) >= 1 || (diffDays / 7) < 2) {
            diffText = `Daqui a ${Math.floor(diffDays / 7)} semanas`;
        }
        else if (diffDays == 0) {
            diffText = "Hoje";
        }
        else if (diffDays == 1) {
            diffText = "Amanhã";
        }
        else if (diffDays > 1 && diffDays < 7) {
            diffText = `Daqui a ${diffDays} dias`;
        }
        document.querySelector(".event-subtitle").textContent = diffText;

        document.querySelector(".presence-info").textContent = event.presence;
        document.querySelector(".song-number").textContent = event.numberOfSongs;

    } else {
        document.querySelector(".event-title").textContent = "Sem eventos";
        document.querySelector(".event-subtitle").textContent = "-";
        document.querySelector(".date-hour").textContent = "-";
        document.querySelector(".presence-info").textContent = "-";
        document.querySelector(".song-number").textContent = "-";
    }
}

function changeMonth(direction) {
    today.setMonth(today.getMonth() + direction);

    // Limpa a seleção visual ao navegar entre meses
    selectedDate = null;

    generateCalendar(today.getFullYear(), today.getMonth());
}

function openYearModal() {
    selectedYear = today.getFullYear();
    generateYearGrid();
    document.getElementById("yearModal").classList.add("active");
}

function closeYearModal() {
    document.getElementById("yearModal").classList.remove("active");
    selectedYear = null;
}

function generateYearGrid() {
    const yearGrid = document.getElementById("yearGrid");
    const startYear = new Date().getFullYear() - 5;
    const endYear = new Date().getFullYear() + 6;

    yearGrid.innerHTML = "";

    for (let year = endYear; year >= startYear; year--) {
        const yearElement = document.createElement("div");
        yearElement.classList.add("year-item");
        yearElement.textContent = year;
        yearElement.dataset.year = year;

        yearElement.addEventListener("click", () => selectYear(year));
        yearGrid.appendChild(yearElement);
    }
    updateAllYearClasses();
}

function selectYear(year) {
    selectedYear = year;
    updateAllYearClasses();
}

function updateAllYearClasses() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll(".year-item[data-year]");

    yearElements.forEach((yearElement) => {
        const year = parseInt(yearElement.dataset.year);

        yearElement.classList.remove("current", "selected");

        if (year === currentYear) {
            yearElement.classList.add("current");
        }

        if (year === selectedYear) {
            yearElement.classList.add("selected");
        }
    });
}

function confirmYearSelection() {
    if (selectedYear !== null) {
        today.setFullYear(selectedYear);
        selectedDate = null;

        generateCalendar(today.getFullYear(), today.getMonth());
    }
    closeYearModal();
}

// Initialize calendar
generateCalendar(today.getFullYear(), today.getMonth());

// Navigation items
document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function () {
        document
            .querySelectorAll(".nav-item")
            .forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");
    });
});

// Close modal when clicking outside
document.getElementById("yearModal").addEventListener("click", function (e) {
    if (e.target === this) {
        closeYearModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeYearModal();
    }
});
