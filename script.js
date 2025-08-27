let today = new Date();
// se der BO com o fuso tenta colocar "T00:00:00"

// const offset = -3; // UTC-3 (horário de Brasília)
// today.setHours(today.getHours() + offset);

console.log(`today: ${today}`);
console.log(`Ano atual: ${today.getFullYear()}`);

let selectedDate = null;
let selectedYear = null;
let isFirstInit = true;

const events = {
    "2025-01-10": {
        title: "Ensaio Mensal",
        description: "Preparação para o culto do mês",
        hour: "19h",
        presence: "7/10",
        numberOfSongs: "5",
    },
    "2025-01-24": {
        title: "Culto Especial",
        description: "Louvor especial com convidados",
        hour: "20h",
        presence: "8/10",
        numberOfSongs: "6",
    },
    "2025-02-07": {
        title: "Noite de Louvor",
        description: "Ensaio e apresentação de novas músicas",
        hour: "19h30",
        presence: "6/8",
        numberOfSongs: "5",
    },
    "2025-02-21": {
        title: "Domingo de Adoração",
        description: "Culto com participação de jovens",
        hour: "20h",
        presence: "7/9",
        numberOfSongs: "7",
    },
    "2025-03-05": {
        title: "Ensaio Especial",
        description: "Preparação para o culto de páscoa",
        hour: "18h30",
        presence: "5/8",
        numberOfSongs: "6",
    },
    "2025-03-19": {
        title: "Louvorzão",
        description: "Culto com músicas tradicionais e novas",
        hour: "19h",
        presence: "8/10",
        numberOfSongs: "8",
    },
    "2025-04-09": {
        title: "Vigília de Páscoa",
        description: "Chegar cedo para organizar o local",
        hour: "21h",
        presence: "6/8",
        numberOfSongs: "7",
    },
    "2025-04-23": {
        title: "Domingo Especial",
        description: "Culto com participação da comunidade",
        hour: "19h30",
        presence: "9/10",
        numberOfSongs: "9",
    },
    "2025-05-08": {
        title: "Noite de Talentos",
        description: "Apresentações de membros da banda",
        hour: "20h",
        presence: "7/9",
        numberOfSongs: "8",
    },
    "2025-05-22": {
        title: "Ensaio Geral",
        description: "Preparação para o culto do final do mês",
        hour: "19h",
        presence: "6/8",
        numberOfSongs: "6",
    },
    "2025-06-05": {
        title: "Culto Jovem",
        description: "Louvor com músicas animadas",
        hour: "18h",
        presence: "8/10",
        numberOfSongs: "7",
    },
    "2025-06-19": {
        title: "Vigília Noturna",
        description: "Chegar às 21h para organizar tudo",
        hour: "22h",
        presence: "5/8",
        numberOfSongs: "6",
    },
    "2025-07-03": {
        title: "Ensaio Musical",
        description: "Preparação do repertório do mês",
        hour: "19h",
        presence: "6/9",
        numberOfSongs: "5",
    },
    "2025-07-17": {
        title: "Louvorzão",
        description: "Culto especial com convidados",
        hour: "20h",
        presence: "8/10",
        numberOfSongs: "8",
    },
    "2025-08-03": {
        title: "Ensaio",
        description: "Ensaio para o louvorzão",
        hour: "19h30",
        presence: "6/8",
        numberOfSongs: "4",
    },
    "2025-08-04": {
        title: "Ensaio Mensal",
        description: "Preparação para o culto do mês",
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
    "2025-08-18": {
        title: "Domingo de Louvor",
        description: "Culto com participação especial",
        hour: "20h",
        presence: "7/9",
        numberOfSongs: "6",
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
    "2025-09-01": {
        title: "Culto",
        description: "Chegar as 21h para organizar o local",
        hour: "22h30",
        presence: "4/8",
        numberOfSongs: "8",
    },
    "2025-09-15": {
        title: "Noite de Talentos",
        description: "Apresentação da banda e convidados",
        hour: "20h",
        presence: "7/9",
        numberOfSongs: "8",
    },
    "2025-09-28": {
        title: "Vigília",
        description: "Chegar as 21h para organizar o local",
        hour: "22h30",
        presence: "4/8",
        numberOfSongs: "8",
    },
    "2025-10-03": {
        title: "Ensaio Geral",
        description: "Preparação para o culto do mês",
        hour: "19h",
        presence: "6/8",
        numberOfSongs: "5",
    },
    "2025-10-17": {
        title: "Louvor de Outubro",
        description: "Culto especial com músicas tradicionais",
        hour: "20h",
        presence: "8/10",
        numberOfSongs: "7",
    },
    "2025-10-31": {
        title: "Aniversario do alysson",
        description: "Chegar as 21h para organizar o local",
        hour: "22h30",
        presence: "4/8",
        numberOfSongs: "8",
    },
    "2025-11-07": {
        title: "Vigília Noturna",
        description: "Chegar às 21h para organizar o culto",
        hour: "22h",
        presence: "5/8",
        numberOfSongs: "6",
    },
    "2025-11-21": {
        title: "Domingo Especial",
        description: "Culto com participação da comunidade",
        hour: "19h30",
        presence: "9/10",
        numberOfSongs: "8",
    },
    "2025-12-05": {
        title: "Ensaio de Natal",
        description: "Preparação para o culto de Natal",
        hour: "19h",
        presence: "7/9",
        numberOfSongs: "6",
    },
    "2025-12-19": {
        title: "Culto de Natal",
        description: "Celebração de Natal com louvor especial",
        hour: "20h",
        presence: "10/12",
        numberOfSongs: "10",
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

    console.log(`Primeiro dia do mês selecionado: ${firstDay}`);

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
                    changeMonth(-1, () => { selectDate(dateStr, dayNumber) });
                } else {
                    // Clicou em dia do próximo mês
                    changeMonth(1, () => { selectDate(dateStr, dayNumber) });
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
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
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
            if (events[dateStr]) {
                dayElement.classList.add("has-event");
            }
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
    const dateObj = new Date(dateStr + "T00:00:00");

    // Preenche detalhes do evento ou mostra informações padrão
    document.querySelector(".date-day").textContent = day.toString().padStart(2, '0');
    document.querySelector(".date-month").textContent = dateObj.toLocaleDateString("pt-BR", { month: "short" }).toUpperCase().slice(0, 3);

    let weekElement = document.querySelector(".date-week");
    const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

    console.log(`DataStr do evento selecionado: ${dateStr}`);
    console.log(`DateObj do evento seleconado: ${dateObj}`);

    let EventDayOfWeek = dateObj.getDay();

    console.log(`Dia da semana do evento selecionado: ${EventDayOfWeek}`);

    weekElement.textContent = daysOfWeek[EventDayOfWeek];

    if (event) {
        document.querySelector(".event-title").textContent = event.title;
        document.querySelector(".date-hour").textContent = event.hour;

        let eventDate = new Date(dateStr + "T00:00:00");
        let todayZero = new Date();
        todayZero.setHours(0, 0, 0, 0);

        let diffText;
        const diffTime = eventDate.getTime() - todayZero.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log(`Hoje zerado ${todayZero}`);
        console.log(`Date do evento zerado: ${eventDate}`);
        console.log(`DiffDays: ${diffDays}`);

        if (diffDays == -1) {
            diffText = "Ontem";
        }
        else if (diffDays < -1 && diffDays > -7) {
            diffText = `Há ${diffDays} dias`;
        }
        else if ((diffDays <= -7 && diffDays > -14)) {
            diffText = `Há 1 semana`;
        }
        else if (diffDays <= -14 && diffDays > -30) {
            diffText = `Há ${Math.floor(diffDays / -7)} semanas`;
        }
        else if (diffDays <= -30 && diffDays > -60) {
            diffText = `Há 1 mês`;
        }
        else if (diffDays < -60) {
            diffText = `Há ${Math.floor(diffDays / -30)} meses`
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
        else if ((diffDays >= 7 && diffDays < 14)) {
            diffText = `Daqui a 1 semana`;
        }
        else if (diffDays >= 14 && diffDays < 30) {
            diffText = `Daqui a ${Math.floor(diffDays / 7)} semanas`;
        }
        else if (diffDays >= 30 && diffDays < 60) {
            diffText = `Daqui a 1 mês`;
        }
        else if (diffDays > 60) {
            diffText = `Daqui a ${Math.floor(diffDays / 30)} meses`
        }
        document.querySelector(".event-subtitle").textContent = diffText;
        document.querySelector(".presence-info").textContent = event.presence;
        document.querySelector(".song-number").textContent = event.numberOfSongs;
    }
    else {
        document.querySelector(".event-title").textContent = "Sem eventos";
        document.querySelector(".event-subtitle").textContent = "-";
        document.querySelector(".date-hour").textContent = "-";
        document.querySelector(".presence-info").textContent = "-";
        document.querySelector(".song-number").textContent = "-";
    }
}

function changeMonth(direction, selectDate) {
    today.setMonth(today.getMonth() + direction);

    // Limpa a seleção visual ao navegar entre meses
    selectedDate = null;

    generateCalendar(today.getFullYear(), today.getMonth());

    // MUDEI AQUI, ANTES ERA if (selectDate) selectDate();
    selectDate();
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
