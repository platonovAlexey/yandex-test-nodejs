# Node.JS
Тестовое задание для yandex-школы NODE.JS

Необходимо реализовать html-страницу с разметкой, логикой поведения и предоставлением глобального js-объекта с методами, описанными в п.1,2,3

1. Разметка

На странице должна быть задана html-форма с id="myForm", внутри которой содержатся
a. инпуты
- ФИО (name="fio"),
- Email (name="email"),
- Телефон (name="phone");
b. кнопка отправки формы (id="submitButton").
А также должен быть задан div-контейнер с id="resultContainer" для вывода результата работы формы.

2. Поведение

При отправке формы должна срабатывать валидация полей по следующим правилам:
- ФИО: Ровно три слова.
- Email: Формат email-адреса, но только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com.
- Телефон: Номер телефона, который начинается на +7, и имеет формат +7(999)999-99-99. Кроме того, сумма всех цифр телефона не должна превышать 30. Например, для +7(111)222-33-11 сумма равняется 24, а для +7(222)444-55-66 сумма равняется 47.

Если валидация не прошла, соответствующим инпутам должен добавиться класс error с заданным стилем border: 1px solid red.
Если валидация прошла успешно, кнопка отправки формы должна стать неактивной и должен отправиться ajax-запрос на адрес, указанный в атрибуте action формы.*

Может быть 3 варианта ответа на запрос с разным поведением для каждого:
a. {"status":"success"} – контейнеру resultContainer должен быть выставлен класс success и добавлено содержимое с текстом "Success"
b. {"status":"error","reason":String} - контейнеру resultContainer должен быть выставлен класс error и добавлено содержимое с текстом из поля reason
c. {"status":"progress","timeout":Number} - контейнеру resultContainer должен быть выставлен класс progress и через timeout миллисекунд необходимо повторить запрос (логика должна повторяться, пока в ответе не вернется отличный от progress статус)

 (*) Для простоты тестирования сабмита формы можно выполнять запросы на статические файлы с разными подготовленными вариантами ответов (success.json, error.json, progress.json). Поднимать отдельный сервер с выдачей разных ответов будет избыточным.

3. Глобальный объект

В глобальной области видимости должен быть определен объект MyForm с методами
validate() => { isValid: Boolean, errorFields: String[] }
getData() => Object
setData(Object) => undefined
submit() => undefined

Метод validate возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields).
Метод getData возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
Метод setData принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
Метод submit выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена. Вызывается по клику на кнопку отправить.


В корне проекта обязательно должны присутствовать файлы
/index.html — разметка страницы;
/index.js – вся клиентская логика страницы.

