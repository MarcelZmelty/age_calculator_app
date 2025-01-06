export class dateCalculator {
    constructor() {
        this.resolveButton = document.querySelector('.calculator__submit-button-box')
        this.resultDays = document.querySelector('.calculator__result-days')
        this.resultMonths = document.querySelector('.calculator__result-months')
        this.resultYears = document.querySelector('.calculator__result-years')
        this.dayInput = document.querySelector('.calculator__input--day')
        this.monthInput = document.querySelector('.calculator__input--month')
        this.yearInput = document.querySelector('.calculator__input--year')
        this.errorMessage = document.querySelector('.calculator__error')
        this.init()
    }
    init() {
        this.resolveButton.addEventListener('click', () => {
            this.resetForm()
            if (!this.validateInputs()) {
                return
            }
            this.calc()

        })
    }
    calc() {
        const currentDate = new Date()
        let [passDays, passMonths, passYears] = this.getData(currentDate)
        if (passDays < 0) {
            const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
            const previousYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear()
            const daysInPreviousMonth = this.getDaysInMonth(previousMonth, previousYear)
            passDays += daysInPreviousMonth
            passMonths -= 1
        }
        if (passMonths < 0) {
            passMonths += 12
            passYears -= 1
        }
        if (passYears < 0) {
            this.errorMessage.textContent = 'The date given is incorrect'
            return
        } else {
            this.resultDays.textContent = passDays
            this.resultMonths.textContent = passMonths
            this.resultYears.textContent = passYears
        }
    }
    getData(currentDate) {
        const result = []
        result.push(currentDate.getDate() - this.dayInput.value)
        result.push((currentDate.getMonth() + 1) - this.monthInput.value)
        result.push(currentDate.getFullYear() - this.yearInput.value)
        return result
    }
    getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate()
    }
    resetForm() {
        this.errorMessage.textContent = ''
        this.resultDays.textContent = '--'
        this.resultMonths.textContent = '--'
        this.resultYears.textContent = '--'
    }
    validateInputs() {
        const day = this.dayInput.value.trim();
        const month = this.monthInput.value.trim();
        const year = this.yearInput.value.trim();
        if (day === '' || month === '' || year === '') {
            this.errorMessage.textContent = 'All fields must be filled out'
            return false
        }
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            this.errorMessage.textContent = 'Inputs must be valid numbers'
            return false
        }
        return true
    }
}

