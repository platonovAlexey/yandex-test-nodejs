class MyForm {
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
	getData(){}
	setData(data){}
	submit(){}
}

const MyForm = new MyForm();