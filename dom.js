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
        this.question_div = create_div(this.content_div, 'question-label', 'card-title');
        this.options_holder_div = create_div(this.content_div, 'question-display-option-holder', 'd-flex flex-row flex-wrap justify-content-start');
        this.options_divs = [];
        for(let i = 0; i < this.question.option_labels.length; i++) {
            this.options_divs.push(create_div(this.options_holder_div, 'question-display-option', 'btn btn-primary m-1'));
            this.options_divs[i].addEventListener('click', ()=>{
                this.question.evaluator_func(this.question.option_labels[i]);
                evaluate();
            })
        }
        
        this.update();
    }

    update() {
        this.question_div.innerText = this.question.question;
        for(let i = 0; i < this.question.option_labels.length; i++) {
            this.options_divs[i].innerHTML = this.question.option_labels[i];
        }
    }
}

function wrap_fasp_status(fasp_status) {
    return "<span class='text-primary text-decoration-underline'>" + fasp_status + "</span>"
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