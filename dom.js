class Element {
    constructor(parent, id, className) {
        this.content_div = create_div(parent, id, className);
    }
}

class QuestionDisplay extends Element {
    constructor(parent, question) {
        super(parent, 'question-display', 'container d-flex flex-column');
        this.parent = parent;
        this.question = question;
        this.question_div = create_div(this.content_div, 'question-label', 'card-title');
        this.options_holder_div = create_div(this.content_div, 'question-display-option-holder', 'd-flex flex-row flex-wrap justify-content-start');
        this.options_divs = [];
        for (let i = 0; i < this.question.option_labels.length; i++) {
            this.options_divs.push(create_div(this.options_holder_div, 'question-display-option', 'btn btn-primary m-1'));
            this.options_divs[i].addEventListener('click', () => {
                this.question.evaluator_func(this.question.option_labels[i]);
                evaluate();
            })
        }

        this.update();
    }

    update() {
        this.question_div.innerText = this.question.question;
        for (let i = 0; i < this.question.option_labels.length; i++) {
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
    if (_className == undefined) {
        _className = _id;
    }
    element.className = _className;
    _parent.appendChild(element);
    return element;
}

function create_div(parent, id, className) {
    return create_element(parent, id, className, 'div');
}

function generate_anomaly_info() {
    if (constants.fasp_criteria.hasOwnProperty(data.anomaly)) {
        _select('anomaly_header').innerText = `FASP Detected Criteria: ${data.anomaly}`;
        _select('anomaly_panel').style.display = 'flex';
        let criteria_holder = _select('anomaly_fasp_criteria_holder');

        if (!constants.fasp_trisomy_anomalies.includes(data.anomaly)) {
            let holder_div = create_div(criteria_holder, '', 'd-flex flex-row justify-content-between border-bottom');
            let key_div = create_div(holder_div, '', '');
            let val_div = create_div(holder_div, '', 'text-success');
            key_div.innerText = data.anomaly;
            val_div.innerText = 'Screen Positive';
        }

        anomaly_criteria = constants.fasp_criteria[data.anomaly];
        for (key in anomaly_criteria) {
            value = anomaly_criteria[key];
            let holder_div = create_div(criteria_holder, '', 'd-flex flex-row justify-content-between border-bottom');
            let key_div = create_div(holder_div, '', '');
            let val_div = create_div(holder_div, '', '');
            key_div.innerText = key;
            val_div.innerText = value;

            if (value.includes("Positive")) {
                val_div.className += " text-success";
                //holder_div.className += " border-success"
            } else {
                val_div.className += " text-danger";
                //holder_div.className += " border-danger"
            }
        }
    }
}