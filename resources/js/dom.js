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
            this.options_divs.push(create_div(this.options_holder_div, 'question-display-option', 'btn btn-primary m-1 d-flex justify-content-center align-items-center'));
            //this.options_divs[i].style.flexBasis = "30%";
            //this.options_divs[i].style.height = "64px";
            this.options_divs[i].addEventListener('click', () => {
                this.question.evaluator_func(this.question.option_labels[i]);
                evaluate();
                //console.log(this.question.option_labels[i]);
            })
        }

        this.update();
    }

    update() {
        this.question_div.innerText = this.question.question;
        for (let i = 0; i < this.question.option_labels.length; i++) {
            let l = this.question.option_labels[i];
            this.options_divs[i].innerHTML = l;
            if(l.includes("'")) {
                this.options_divs[i].className = this.options_divs[i].className.replace('btn-primary', 'btn-info')
            }
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
        panels.fasp_detected_header.innerText = `FASP Detected Criteria: ${data.anomaly}`;
        panels.fasp_detected_panel.style.display = 'flex';
        let criteria_holder = panels.fasp_detected_criteria_holder;

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

function generate_validations(primary, secondary) {
    panels.validations_holder.innerHTML = '';

    let status = (primary === undefined) ? secondary : primary;
    panels.validations_panel.style.display = 'flex';
    let secondary_status = (primary !== undefined) ? secondary : undefined;

    let items = new Set();
    for (let v of constants.validations.common) {
        items.add(v);
    }

    if (typeof (status) === 'object') status = undefined;
    if (typeof (secondary_status) === 'object') secondary_status = undefined;

    //console.log(status, secondary_status);

    if (status !== undefined) {
        if (!status.includes('Ineligible: Late/No Booking')) {
            items.add("Booking hospital")
        } else {
            if (secondary_status !== undefined) {
                if (!secondary_status.includes('Ineligible: Late/No Booking')) {
                    items.add("Booking hopital")
                    items.add("Booking date")
                } else {
                    items.add("Booking hospital (if booked)");
                    items.add("Never booked ticked <u>OR</u> booking date populated.")
                }
            } else {
                items.add("Booking hospital (if booked)");
                items.add("Never booked ticked <u>OR</u> booking date populated.")
            }
        }

        // Get items for primary status
        for (st in constants.validations) {
            if (status.includes(st)) {
                for (let v of constants.validations[st]) {
                    items.add(v);
                }
            }
        }

        // Get items for secondary status (if exists)
        if (secondary_status !== undefined) {
            for (st in constants.validations) {
                if (secondary_status.includes(st)) {
                    for (let v of constants.validations[st]) {
                        items.add(v);
                    }
                }
            }
        }

        if (status.includes('Early fetal loss')) {
            if (status.includes('TOP')) {
                items.add("Pregnancy Outcome = 'Induced abortion/TOP (<24/40)'")
            } else {
                items.add("Pregnancy Outcome = 'Miscarriage/fetal loss (<24/40)'<br><u>OR</u><br>Pregnancy Outcome = 'Livebirth' <u>AND</u> Delivery Gestation < 23+1")
            }
        }

        if (secondary_status !== undefined) {
            if (secondary_status.includes('Early fetal loss')) {
                if (secondary_status.includes('TOP')) {
                    items.add("Pregnancy Outcome = 'Induced abortion/TOP (<24/40)'")
                } else {
                    items.add("Pregnancy Outcome = 'Miscarriage/fetal loss (<24/40)'<br><u>OR</u><br>Pregnancy Outcome = 'Livebirth' <u>AND</u> Delivery Gestation < 23+1")
                }
            }
        }
    }

    for (let el of items) {
        let i_div = create_div(panels.validations_holder, '', 'list-group-item');
        i_div.innerHTML = el;
    }
}