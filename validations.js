document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.needs-validation')

    const nameInput = document.getElementById('name')
    const dateInput = document.getElementById('date')
    const timeInput = document.getElementById('time')
    const cityInput = document.getElementById('city')
    const emailInput = document.getElementById('email')
    const phoneInput = document.getElementById('phone')
    const streetInput = document.getElementById('street')
    const deliveryOption = document.getElementById('delivery')
    const withdrawOption = document.getElementById('withdraw')
    const registrationInput = document.getElementById('registration')
    const neighborhoodInput = document.getElementById('neighborhood')
    const observationsInput = document.getElementById('observations')

    const dateFeedback = document.getElementById('date-feedback')
    const timeFeedback = document.getElementById('time-feedback')

    const confirmButton = document.getElementById('confirmButton')
    const modal = new bootstrap.Modal(document.getElementById('appointmentModal'))
    const successToast = new bootstrap.Toast(document.getElementById('successToast'))

    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    const todayFormatted = `${year}-${month}-${day}`

    dateInput.min = todayFormatted

    dateInput.addEventListener('change', validateDate)
    dateInput.addEventListener('input', validateDate)
    timeInput.addEventListener('change', validateTime)

    form.addEventListener('submit', handleSubmit)
    form.addEventListener('reset', handleResetForm)

    deliveryOption.addEventListener('change', toggleAddressFields)
    withdrawOption.addEventListener('change', toggleAddressFields)

    toggleAddressFields()

    function validateDate() {
        const [year, month, day] = dateInput.value.split('-').map(Number)
        const selectedDate = new Date(year, month - 1, day)

        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        dateInput.setCustomValidity('')
        dateInput.classList.remove('is-invalid', 'is-valid')

        if (!dateInput.value) {
            dateFeedback.textContent = 'É obrigatório informar uma data'
            dateInput.classList.add('is-invalid')

            return false
        }

        if (selectedDate < currentDate) {
            dateInput.setCustomValidity('A data não pode ser anterior ao dia de hoje')
            dateFeedback.textContent = 'A data não pode ser anterior ao dia de hoje'
            dateInput.classList.add('is-invalid')

            return false
        }

        dateInput.classList.add('is-valid')

        return true
    }

    function validateTime() {
        const date = dateInput.value
        const time = timeInput.value

        timeInput.setCustomValidity('')
        timeInput.classList.remove('is-invalid', 'is-valid')

        if (!time) {
            timeFeedback.textContent = 'É obrigatório informar um horário'
            timeInput.classList.add('is-invalid')

            return false
        }

        const selectedHour = parseInt(time.split(':')[0])
        const selectedMinute = parseInt(time.split(':')[1])

        if (selectedHour < 9 || selectedHour >= 20) {
            timeInput.setCustomValidity('O horário de agendamento deve ser entre 09:00h e 20:00h')
            timeFeedback.textContent = 'O horário de agendamento deve ser entre 09:00h e 20:00h'
            timeInput.classList.add('is-invalid')

            return false
        }

        if (date === todayFormatted) {
            const now = new Date()
            const currentHour = now.getHours()
            const currentMinute = now.getMinutes()

            const minAppointmentTime = (currentHour * 60) + currentMinute + 120
            const selectedTimeInMinutes = (selectedHour * 60) + selectedMinute

            if (selectedTimeInMinutes < minAppointmentTime) {
                timeInput.setCustomValidity('Para agendamentos no mesmo dia, o horário deve ter no mínimo 2 horas de antecedência')
                timeFeedback.textContent = 'Para agendamentos no mesmo dia, o horário deve ter no mínimo 2 horas de antecedência'
                timeInput.classList.add('is-invalid')

                return false
            }
        }

        timeInput.classList.add('is-valid')

        return true
    }

    function toggleAddressFields() {
        const isDelivery = deliveryOption.checked

        const addressFields = [streetInput, neighborhoodInput, cityInput]

        addressFields.forEach(field => {
            field.disabled = !isDelivery
            field.required = isDelivery

            if (!isDelivery) {
                field.value = ''
                field.classList.remove('is-invalid', 'is-valid')

                const feedbackElement = document.getElementById(field.id + '-feedback')

                if (feedbackElement) {
                    feedbackElement.textContent = ''
                }
            }
        })
    }

    function handleModalContent() {
        const name = nameInput.value
        const city = cityInput.value
        const date = dateInput.value
        const time = timeInput.value
        const email = emailInput.value
        const phone = phoneInput.value
        const street = streetInput.value
        const registration = registrationInput.value
        const neighborhood = neighborhoodInput.value
        const observations = observationsInput.value
        const deliveryType = document.querySelector('input[name="delivery-option"]:checked')?.value

        let dateFormatted = 'Não informado'

        if (date) {
            const [year, month, day] = date.split('-')

            dateFormatted = `${day}/${month}/${year}`
        }

        let addressContent

        if (deliveryType === 'Retirar no balcão') {
            addressContent = 'Não se aplica'
        } else {
            addressContent = `${street || ''}, ${neighborhood || ''}, ${city || ''}`.replace(/^,\s/, '');
        }

        document.getElementById('modal-name').textContent = name
        document.getElementById('modal-email').textContent = email
        document.getElementById('modal-phone').textContent = phone
        document.getElementById('modal-registration').textContent = registration
        document.getElementById('modal-delivery-type').textContent = deliveryType
        document.getElementById('modal-address').textContent = addressContent
        document.getElementById('modal-date').textContent = dateFormatted
        document.getElementById('modal-time').textContent = `${time}h`
        document.getElementById('modal-observations').textContent = observations || 'Não informado'
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.stopPropagation()

        const isDelivery = deliveryOption.checked
        let isDateValid = true
        let isTimeValid = true

        if (isDelivery) {
            isDateValid = validateDate()
            isTimeValid = validateTime()
        }

        if (form.checkValidity() && isDateValid && isTimeValid) {
            handleModalContent()
            modal.show()
        } else {
            form.classList.add('was-validated')
        }
    }

    function handleResetForm() {
        form.classList.remove('was-validated')

        const formControls = form.querySelectorAll('.form-control')

        formControls.forEach(control => {
            control.classList.remove('is-invalid', 'is-valid')
        })

        const feedbackElements = form.querySelectorAll('.invalid-feedback')

        feedbackElements.forEach(feedback => {
            feedback.textContent = ''
        })

        timeFeedback.textContent = ''
        toggleAddressFields()
    }

    function handleConfirmDelivery() {
        modal.hide()
        successToast.show()

        setTimeout(() => {
            form.reset()
            form.classList.remove('was-validated')

            handleResetForm()
        }, 1000)
    }

    if (confirmButton) {
        confirmButton.addEventListener('click', handleConfirmDelivery)
    }
})
