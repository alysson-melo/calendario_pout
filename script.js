const maxYear = new Date().getFullYear() - 80; // Máximo: 80 anos atrás
const minYear = new Date().getFullYear() - 15; // Mínimo: 15 anos atrás
let currentDate = new Date(minYear, 0, 1); // Inicia no ano mais recente permitido
let selectedDate = null;
let selectedYear = null;
let isFirstInit = true;

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
        let isValidDate = true;

        if (i < startingDayOfWeek) {
            // Dias do mês anterior
            dayNumber = daysInPrevMonth - (startingDayOfWeek - 1 - i);
            dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            isCurrentMonth = false;
            dayElement.classList.add('other-month');

            // Verifica se a data é válida para nascimento
            isValidDate = prevYear >= maxYear && prevYear <= minYear;
        } else if (dayCounter <= daysInMonth) {
            // Dias do mês atual
            dayNumber = dayCounter;
            dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            dayCounter++;

            // Verifica se a data é válida para nascimento
            isValidDate = year >= maxYear && year <= minYear;
        } else {
            // Dias do próximo mês
            dayNumber = nextMonthDay;
            dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            nextMonthDay++;
            isCurrentMonth = false;
            dayElement.classList.add('other-month');

            // Verifica se a data é válida para nascimento
            isValidDate = nextYear >= maxYear && nextYear <= minYear;
        }

        dayElement.textContent = dayNumber;
        dayElement.dataset.date = dateStr;
        dayElement.dataset.isCurrentMonth = isCurrentMonth;

        // Adiciona evento de clique apenas para datas válidas
        if (isValidDate) {
            if (isCurrentMonth) {
                dayElement.addEventListener('click', () => selectDate(dateStr, dayNumber));
            } else {
                // Para dias de outros meses válidos, navega para esse mês ao clicar
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
        } else {
            // Datas inválidas não são clicáveis
            dayElement.style.opacity = '0.3';
            dayElement.style.cursor = 'not-allowed';
        }

        calendar.appendChild(dayElement);
    }

    // Atualiza classes de dias
    updateAllDayClasses();
}

function updateAllDayClasses() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const dayElements = document.querySelectorAll('.day[data-date]');

    dayElements.forEach(dayElement => {
        const dateStr = dayElement.dataset.date;
        const isCurrentMonth = dayElement.dataset.isCurrentMonth === 'true';

        // Limpa classes dinâmicas (mantém other-month se aplicável)
        dayElement.classList.remove('today', 'selected');

        // Aplica condições apenas para dias do mês atual
        if (isCurrentMonth) {
            if (todayStr === dateStr) {
                dayElement.classList.add('today');
            }

            if (selectedDate && selectedDate === dateStr) {
                dayElement.classList.add('selected');
            }
        } else {
            // Para dias de outros meses
            if (selectedDate && selectedDate === dateStr) {
                dayElement.classList.add('selected');
            }
        }
    });
}

function selectDate(dateStr, day) {
    selectedDate = dateStr;

    // Atualiza classes e detalhes da data
    updateAllDayClasses();
    updateBirthDetails(dateStr, day);
}

function updateBirthDetails(dateStr, day) {
    const [year, month, dayNum] = dateStr.split('-').map(Number);
    const selectedDateObj = new Date(year, month - 1, dayNum);
    const today = new Date();

    // Preenche detalhes da data selecionada
    document.getElementById('birthDay').textContent = day;
    document.getElementById('birthMonth').textContent = selectedDateObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().slice(0, 3);

    // Calcula idade
    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() - (month - 1);

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dayNum)) {
        age--;
    }

    document.getElementById('birthTitle').textContent = selectedDateObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('birthSubtitle').textContent = 'Data de nascimento selecionada';
    document.getElementById('ageInfo').textContent = `Idade atual: ${age} anos`;

    // Habilita o botão de confirmar
    document.getElementById('confirmBtn').disabled = false;
}

function clearSelection() {
    selectedDate = null;
    updateAllDayClasses();

    // Limpa os detalhes
    document.getElementById('birthDay').textContent = '-';
    document.getElementById('birthMonth').textContent = '-';
    document.getElementById('birthTitle').textContent = 'Selecione uma data';
    document.getElementById('birthSubtitle').textContent = 'Clique em um dia para selecionar a data de nascimento';
    document.getElementById('ageInfo').textContent = '';

    // Desabilita o botão de confirmar
    document.getElementById('confirmBtn').disabled = true;
}

function confirmBirthDate() {
    if (selectedDate) {
        alert(`Data de nascimento confirmada: ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}`);
        // Aqui você pode adicionar lógica para salvar a data ou enviar para um servidor
    }
}

function changeMonth(direction) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);

    // Verifica se o novo mês/ano está dentro dos limites
    if (newDate.getFullYear() >= maxYear && newDate.getFullYear() <= minYear) {
        currentDate = newDate;
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
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

    yearGrid.innerHTML = '';

    // Gera anos de minYear até maxYear (ordem decrescente para mostrar anos mais recentes primeiro)
    for (let year = minYear; year >= maxYear; year--) {
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
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
    closeYearModal();
}

// Initialize calendar
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

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