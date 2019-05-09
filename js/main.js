//console.log(showdown.getDefaultOptions())
function render() {
    showdown.setOption('tables', true);
    showdown.setOption('strikethrough', true);
    showdown.setOption('tasklists', true);
    showdown.setOption('emoji', true);

    editor = document.getElementById("input");
    var converter = new showdown.Converter(),
        content = editor.value,
        html = converter.makeHtml(content);

    page = document.getElementById("page");
    page.innerHTML = html;
}

function toggleView() {
    pageContainer = document.getElementById("pageOuter");
    pageContainer.classList.toggle("hide");
    editor.classList.toggle("hide");

    button = document.getElementById("preview");
    if (button.innerText == "Preview") {
        button.innerText = "Edit";
    } else {
        button.innerText = "Preview";
    }
}

function preview() {
    render();
    toggleView();
}

function clearAll() {
    var editor = document.getElementById("input");
    if (editor.value && confirm("Are you sure you want to delete your content? This cannot be undone.")) {
        editor.value = "";
    };
    if (!document.getElementById("pageOuter").classList.contains("hide")) {
        toggleView();
    }
}

function printpdf() {
    render();
    if (document.getElementById("pageOuter").classList.contains("hide")) {
        toggleView();
    }
    window.print();
}

function saveFile() {
    var content = document.getElementById("input").value;
    localStorage.setItem('usermd', JSON.stringify(content));
}

function firstLoad() {
    if (localStorage.getItem('usermd')) {
        document.getElementById("input").value = JSON.parse(localStorage.getItem('usermd'))
    }
}