const maxYear = new Date().getFullYear() - 80;
const minYear = new Date().getFullYear() - 15;
let currentDate = new Date(minYear, 0, 1);
let selectedDate = null;
let selectedYear = null;

// Gera o calendário
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

    // Cabeçalhos dos dias
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

    // Espaços vazios antes do primeiro dia
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

        if (todayStr === dateStr) {
            dayElement.classList.add('today');
        }

        if (selectedDate === dateStr) {
            dayElement.classList.add('selected');
        }

        dayElement.addEventListener('click', () => selectDate(dateStr));
        calendar.appendChild(dayElement);
    }
}

// Seleção de data
function selectDate(dateStr) {
    selectedDate = dateStr;

    // Atualiza currentDate para o mês e ano da data clicada
    const [year, month, day] = dateStr.split('-').map(Number);
    currentDate.setFullYear(year, month - 1, day);

    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Navegar entre meses
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    selectedDate = null;
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Modal de seleção de ano
function openYearModal() {
    selectedYear = currentDate.getFullYear();
    generateYearGrid();
    document.getElementById('yearModal').classList.add('active');
}

function closeYearModal() {
    document.getElementById('yearModal').classList.remove('active');
    selectedYear = null;
}

// Gera lista de anos
function generateYearGrid() {
    const yearGrid = document.getElementById('yearGrid');
    yearGrid.innerHTML = '';

    for (let year = minYear; year >= maxYear; year--) {
        const yearElement = document.createElement('div');
        yearElement.classList.add('year-item');
        yearElement.textContent = year;

        if (year === selectedYear) {
            yearElement.classList.add('selected');
        }

        yearElement.addEventListener('click', () => selectYear(year));
        yearGrid.appendChild(yearElement);
    }
}

// Selecionar ano no modal
function selectYear(year) {
    selectedYear = year;
    document.querySelectorAll('.year-item').forEach(item => {
        item.classList.remove('selected');
        if (parseInt(item.textContent) === year) {
            item.classList.add('selected');
        }
    });
}

// Confirmar seleção de ano
function confirmYearSelection() {
    if (selectedYear !== null) {
        currentDate.setFullYear(selectedYear);
        selectedDate = null;
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
    closeYearModal();
}

// Inicializa calendário
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Fechar modal clicando fora
document.getElementById('yearModal').addEventListener('click', function (modalOverlay) {
    if (modalOverlay.target === this) closeYearModal();
});

// Fechar modal com Escape
document.addEventListener('keydown', function (keydownEvent) {
    if (keydownEvent.key === 'Escape') closeYearModal();
});
