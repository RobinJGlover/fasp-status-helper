class Element {
    constructor(parent, id, className) {
        this.content_div = create_div(parent, id, className);
    }
}

class QuestionDisplay extends Element{
    constructor(parent, question) {
        super(parent, 'question-display', 'container d-flex flex-column');
        this.parent = parent;
        this.question = question;
        this.question_div = create_div(this.content_div, 'question-label', '');
        this.options_holder_div = create_div(this.content_div, 'question-display-option-holder', 'd-flex flex-row flex-wrap justify-content-start');
        this.options_divs = [];
        for(let i = 0; i < this.question.options.length; i++) {
            this.options_divs.push(create_div(this.options_holder_div, 'question-display-option', 'btn btn-primary m-2'));
            this.options_divs[i].addEventListener('click', ()=>{
                this.question.options[i].on_choose();
            })
        }
        
        this.update();
    }

    update() {
        this.question_div.innerText = this.question.label;
        for(let i = 0; i < this.question.options.length; i++) {
            this.options_divs[i].innerHTML = this.question.options[i].label;
        }
    }
}

function _select(id) {
    return document.getElementById(id);
}

function create_element(_parent, _id, _className, _tag) {
    let element = document.createElement(_tag);
    element.id = _id;
    if(_className == undefined) {
        _className = _id;
    }
    element.className = _className;
    _parent.appendChild(element);
    return element;
}

function create_div(parent, id, className) {
    return create_element(parent, id, className, 'div');
}