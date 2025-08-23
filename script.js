let currentDate = new Date();
let selectedDate = null;
let selectedYear = null;
let isFirstInit = true;

// Eventos de exemplo - agora incluindo as datas que aparecem roxas na imagem
const events = {
    '2025-08-03': {
        title: 'Ensaio',
        subtitle: 'Preparação',
        likes: '5/0',
        comments: '2'
    },
    '2025-08-16': {
        title: 'Louvor&ão',
        subtitle: 'Culto e uma semana',
        likes: '6/1',
        comments: '4'
    },
    '2025-08-17': {
        title: 'Domingo',
        subtitle: 'Culto principal',
        likes: '8/0',
        comments: '3'
    },
    '2025-08-27': {
        title: 'Ensaio Especial',
        subtitle: 'Preparação',
        likes: '4/0',
        comments: '1'
    },
    '2025-08-28': {
        title: 'Culto Jovem',
        subtitle: 'Ministração jovem',
        likes: '12/1',
        comments: '7'
    }
};

function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    monthYear.textContent = `${months[month]} de ${year}`;
    calendar.innerHTML = '';

    // Add day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Calcular dias do mês anterior
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    // Calcular dias do próximo mês
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    // Total de células necessárias (6 semanas × 7 dias)
    const totalCells = 42;
    let dayCounter = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < totalCells; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

        let dayNumber;
        let dateStr;
        let isCurrentMonth = true;

        if (i < startingDayOfWeek) {
            // Dias do mês anterior
            dayNumber = daysInPrevMonth - (startingDayOfWeek - 1 - i);
            dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            isCurrentMonth = false;
            dayElement.classList.add('other-month');
        } else if (dayCounter <= daysInMonth) {
            // Dias do mês atual
            dayNumber = dayCounter;
            dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            dayCounter++;
        } else {
            // Dias do próximo mês
            dayNumber = nextMonthDay;
            dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            nextMonthDay++;
            isCurrentMonth = false;
            dayElement.classList.add('other-month');
        }

        dayElement.textContent = dayNumber;
        dayElement.dataset.date = dateStr;
        dayElement.dataset.isCurrentMonth = isCurrentMonth;

        // Adiciona evento de clique apenas para dias do mês atual
        if (isCurrentMonth) {
            dayElement.addEventListener('click', () => selectDate(dateStr, dayNumber));
        } else {
            // Para dias de outros meses, navega para esse mês ao clicar
            dayElement.addEventListener('click', () => {
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

    // Atualiza classes de dias
    updateAllDayClasses();

    // Seleciona o dia atual automaticamente
    const today = new Date();
    if (isFirstInit && year === today.getFullYear() && month === today.getMonth()) {
        selectedDate = today.toISOString().slice(0, 10);
        selectDate(selectedDate, today.getDate());
        isFirstInit = false;
    }
}

function updateAllDayClasses() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const dayElements = document.querySelectorAll('.day[data-date]');

    dayElements.forEach(dayElement => {
        const dateStr = dayElement.dataset.date;
        const isCurrentMonth = dayElement.dataset.isCurrentMonth === 'true';

        // Limpa classes dinâmicas (mantém other-month se aplicável)
        dayElement.classList.remove('today', 'selected', 'has-event');

        // Aplica condições apenas para dias do mês atual
        if (isCurrentMonth) {
            if (todayStr === dateStr) {
                dayElement.classList.add('today');
                dayElement.classList.add('selected');
            }

            if (selectedDate && selectedDate === dateStr) dayElement.classList.add('selected');
            if (events[dateStr]) dayElement.classList.add('has-event');

        } else {
            // Para dias de outros meses, apenas verifica se tem eventos
            if (events[dateStr]) dayElement.classList.add('has-event');
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
    const eventDetails = document.getElementById('eventDetails');

    // Preenche detalhes do evento ou mostra informações padrão
    document.getElementById('eventDay').textContent = day;
    document.getElementById('eventMonth').textContent = currentDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().slice(0, 3);

    if (event) {
        document.getElementById('eventTitle').textContent = event.title;
        document.getElementById('eventSubtitle').textContent = event.subtitle;

        const actionBtns = eventDetails.querySelectorAll('.action-btn');
        actionBtns[0].textContent = `👍 ${event.likes}`;
        actionBtns[1].textContent = `📝 ${event.comments}`;
    } else {
        document.getElementById('eventTitle').textContent = 'Sem eventos';
        document.getElementById('eventSubtitle').textContent = '-';

        const actionBtns = eventDetails.querySelectorAll('.action-btn');
        actionBtns[0].textContent = '👍 -';
        actionBtns[1].textContent = '📝 -';
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);

    // Limpa a seleção visual ao navegar entre meses
    selectedDate = null;

    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function openYearModal() {
    selectedYear = currentDate.getFullYear();
    generateYearGrid();
    document.getElementById('yearModal').classList.add('active');
}

function closeYearModal() {
    document.getElementById('yearModal').classList.remove('active');
    selectedYear = null;
}

function generateYearGrid() {
    const yearGrid = document.getElementById('yearGrid');
    const startYear = new Date().getFullYear() - 5;
    const endYear = new Date().getFullYear() + 6;

    yearGrid.innerHTML = '';

    for (let year = endYear; year >= startYear; year--) {
        const yearElement = document.createElement('div');
        yearElement.classList.add('year-item');
        yearElement.textContent = year;
        yearElement.dataset.year = year;

        yearElement.addEventListener('click', () => selectYear(year));
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
    const yearElements = document.querySelectorAll('.year-item[data-year]');

    yearElements.forEach(yearElement => {
        const year = parseInt(yearElement.dataset.year);

        yearElement.classList.remove('current', 'selected');

        if (year === currentYear) {
            yearElement.classList.add('current');
        }

        if (year === selectedYear) {
            yearElement.classList.add('selected');
        }
    });
}

function confirmYearSelection() {
    if (selectedYear !== null) {
        currentDate.setFullYear(selectedYear);
        selectedDate = null;

        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
    closeYearModal();
}

// Initialize calendar
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Navigation items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Close modal when clicking outside
document.getElementById('yearModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeYearModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeYearModal();
    }
});