let form = document.querySelector("form");
let body = document.body;

document.getElementById("input-name").focus();

const createTag = (tagName, cssClass, content = null) => {
  let tag = document.createElement(tagName);
  tag.classList.add(cssClass);
  if (content) tag.textContent = content;
  return tag;
};

const createComment = (name, text, date) => {
  let commentElement = createTag("div", "comment");

  let commentContent = createTag("div", "comment__content");

  let commentAside = createTag("div", "comment__aside");
  commentAside.innerHTML =
    "<img src='./img/trash.png' class='remove-button'/><div class='like-button'></div>";

  commentElement.append(commentContent, commentAside);

  let commentName = createTag("span", "comment__name", name);
  let commentText = createTag("p", "comment__text", text);
  let commentDate = createTag("b", "comment__date", date);

  commentContent.append(commentName, commentText, commentDate);

  return commentElement;
};

const addComment = (place, comment) => {
  place.append(comment);
};

const inputsIsValid = (nameInput, textInput) => {
  if (!nameInput.value.trim().length) {
    showError("Представьтесь пожалуйста!");
    nameInput.focus();
    return false;
  }
  if (textInput.value.trim().length < 5) {
    showError("Ну напишите хоть пять букв, что-ли)))");
    textInput.focus();
    return false;
  }
  return true;
};

const clearFields = (form) => {
  [...form].forEach((field) => {
    if (field.value !== "Отправить") field.value = "";
  });
};

const wasYesterday = (date) => {
  let now = new Date().getDate();
  if (now === new Date(date).getDate() + 1) {
    return true;
  }
};

const wasToday = (date) => {
  let now = new Date().getDate();
  if (now == new Date(date).getDate() || !date) {
    return true;
  }
};

const showError = (errorMessage) => {
  let errorElem = document.getElementById("error");
  errorElem.classList.add("error");
  errorElem.textContent = errorMessage;
};

const hideError = () => {
  let errorElem = document.getElementById("error");
  errorElem.classList.remove("error");
};

const handleInputChange = (e) => {
  if (e.target.name == "name" || e.target.name == "comment") {
    hideError();
  }
};

const handleEnter = (e) => {
  if (e.code === "Enter") {
    handleSubmit(e);
  }
};

const handleActions = (e) => {
  let target = e.target;

  if (target.className == "remove-button") {
    let blockToRemove = target.closest(".comment");
    blockToRemove.remove();
  }
  if (target.classList.contains("like-button")) {
    target.classList.toggle("liked");
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!inputsIsValid(form.elements.name, form.elements.comment)) return;

  let now = new Date();

  let [name, comment, date] = [
    form.elements.name.value,
    form.elements.comment.value,
    form.elements.date.value,
  ];

  if (wasYesterday(date)) {
    date = `Вчера в ${now.toLocaleString().split(",")[1]}`;
  }
  if (wasToday(date)) {
    date = `Сегодня в ${now.toLocaleString().split(",")[1]}`;
  }

  addComment(document.body, createComment(name, comment, date));

  clearFields(form);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", handleEnter);
form.addEventListener("keypress", handleInputChange);

body.addEventListener("click", handleActions);
