class Form {
	constructor() {
		document.getElementById('myForm').addEventListener('submit', this.submit.bind(this));
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
		this.setData = this.setData.bind(this);
		this.getData = this.getData.bind(this);
	}
	
	validate() {
		let errorFields = [];
		let isValid = true;

		const allDomains = ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'];
		const domain = document.getElementById('email').value.replace(/.*@/, '');

		if (!allDomains.includes(domain)) {
			isValid = false;
			errorFields.push('email');
		}

		const fio = document.getElementById('fio').value;
		const fioLength = document.getElementById('fio').value.trim().split(/\s+/).length;
		const fioMaxWords = 3;

		if (fioLength !== fioMaxWords) {
			isValid = false;
			errorFields.push('fio');
		}

		if (!/^[a-zA-Z а-яА-Я]*$/g.test(fio)) {
			isValid = false;
			errorFields.push('fio');
		}

		const phoneNumber = document.getElementById('phone').value;
		const phoneReg = new RegExp(/^\+7\(\d{3}\)\d{3}(?:-\d{2}){2}$/);
		const phoneMaxNumber = 30;

		let sumPhoneNumber = (number) => {
			return number.match(/\d/g).reduce((a, b) => +a + +b);
		};

		if (phoneReg.test(phoneNumber)) {
			if (sumPhoneNumber(phoneNumber) >= phoneMaxNumber) {
				isValid = false;
				errorFields.push('phone');
			}

		} else {
			isValid = false;
			errorFields.push('phone');
		}

		return {
			errorFields: errorFields,
			isValid: isValid
		};
	}

	getData() {
		return [].reduce.call(document.getElementById('myForm').elements, (data, element) => {
			let isValidElement = (el) => {
				return el.name === el.type;
			};

			if (isValidElement(element)) {
				data[element.name] = element.value;
			}

			return data;
		}, {});
	}

	setData(data) {
		const form = document.getElementById('myForm');

		for (let [key, value] of Object.entries(data)) {
			if (key === 'phone' || key === 'email' || key === 'fio') {
				if (form.elements[key]) {
					form.elements[key].value = value;
				}
			}
		}
	}

	submit(event){
		if (typeof event !== 'undefined') {
			event.preventDefault();
		}

		let resultValidation = this.validate();
		const resultContainer = document.getElementById('resultContainer');
		const submitButton = document.getElementById('submitButton');

		for (let input of document.getElementsByTagName('input')) {
			input.classList.remove('error');
		}

		resultContainer.className = '';
		resultContainer.innerHTML = '';

		if (resultValidation.isValid) {
			submitButton.disabled = true;

			let fetchJSONFile = () => {
				const xhr = new XMLHttpRequest();

				xhr.open('GET', document.getElementById('myForm').action, false);
				xhr.send();
				const successStatusCode = 200;
				const completeCode = 4;

				if (xhr.readyState === completeCode) {
					if (xhr.status === successStatusCode) {
						let data = JSON.parse(xhr.responseText);

						if (data.status === 'success') {
							resultContainer.className = 'success';
							resultContainer.innerHTML = 'Success';
						} else if (data.status === 'error') {
							resultContainer.className = 'error';
							resultContainer.innerHTML = data.reason;
						} else if (data.status === 'progress') {
							resultContainer.className = 'progress';
							setTimeout(() => {
								fetchJSONFile();
							}, data.timeout);
						}
					}
				}
			};

			fetchJSONFile();

		} else {
			for (let value of resultValidation.errorFields) {
				document.getElementById(value).className = 'error';
			}
		}
	}

}

const MyForm = new Form();