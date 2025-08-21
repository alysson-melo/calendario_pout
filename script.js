let currentDate = new Date();
let selectedDate = null;
let selectedYear = null;

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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        calendar.appendChild(emptyDay);
    }

    const todayStr = new Date().toISOString().slice(0, 10);

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Check if it's today (day 7)
        if (todayStr === dateStr) {
            dayElement.classList.add('today');
        }

        // Check if it's selected
        if (selectedDate && selectedDate === dateStr) {
            dayElement.classList.add('selected');
        }

        // Check if there's an event (days with events get purple background)
        if (events[dateStr]) {
            dayElement.classList.add('has-event');
        }

        dayElement.addEventListener('click', () => selectDate(dateStr, day));
        calendar.appendChild(dayElement);
    }
}

function selectDate(dateStr, day) {
    selectedDate = dateStr;
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

    const event = events[dateStr];
    const eventDetails = document.getElementById('eventDetails');

    if (event) {
        eventDetails.classList.remove('hidden');
        document.getElementById('eventDay').textContent = day;
        document.getElementById('eventMonth').textContent = currentDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase();
        document.getElementById('eventTitle').textContent = event.title;
        document.getElementById('eventSubtitle').textContent = event.subtitle;

        const actionBtns = eventDetails.querySelectorAll('.action-btn');
        actionBtns[0].textContent = `👍 ${event.likes}`;
        actionBtns[1].textContent = `📝 ${event.comments}`;
    } else {
        // Show default event info for dates without events
        document.getElementById('eventDay').textContent = day;
        document.getElementById('eventMonth').textContent = currentDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase();
        document.getElementById('eventTitle').textContent = 'Sem eventos';
        document.getElementById('eventSubtitle').textContent = 'Nenhum evento agendado';

        const actionBtns = eventDetails.querySelectorAll('.action-btn');
        actionBtns[0].textContent = '👍 0/0';
        actionBtns[1].textContent = '📝 0';
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    selectedDate = null; // Clear selection when changing months
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

    // Hide event details when changing months
    document.getElementById('eventDetails').classList.add('hidden');
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
    const currentYear = new Date().getFullYear();
    const startYear = 1940;
    const endYear = 2035;

    yearGrid.innerHTML = '';

    // Generate all years from 1940 to 2035
    for (let year = endYear; year >= startYear; year--) { // Reverse order (newest first)
        const yearElement = document.createElement('div');
        yearElement.classList.add('year-item');
        yearElement.textContent = year;

        if (year === currentYear) {
            yearElement.classList.add('current');
        }

        if (year === selectedYear) {
            yearElement.classList.add('selected');
        }

        yearElement.addEventListener('click', () => selectYear(year));
        yearGrid.appendChild(yearElement);
    }

    // Auto-scroll to selected year or current year
    setTimeout(() => {
        const targetElement = document.querySelector('.year-item.selected') ||
            document.querySelector('.year-item.current');
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, 100);
}

function selectYear(year) {
    selectedYear = year;

    // Update visual selection
    document.querySelectorAll('.year-item').forEach(item => {
        item.classList.remove('selected');
        if (parseInt(item.textContent) === year) {
            item.classList.add('selected');
        }
    });
}

function confirmYearSelection() {
    if (selectedYear !== null) {
        currentDate.setFullYear(selectedYear);
        selectedDate = null; // Clear selection when changing year
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

        // Hide event details when changing year
        document.getElementById('eventDetails').classList.add('hidden');
    }
    closeYearModal();
}

// Initialize calendar
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Set default selection to day 16
setTimeout(() => {
    selectDate('2025-08-16', 16);
}, 100);

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