let data, objects, panels;
function main() {
    data = {};
    objects = {};
    panels = {};

    panels.result_holder = _select("result_holder");

    reset();
}

function evaluate() {
    panels.result_holder.innerHTML = '';

    if (data.result === null) {
        panels.result_holder.innerHTML = "This path has not been finalised.";
        return;
    }

    if (typeof (data.result) === 'string') {
        if (data.first_screening_status) {
            panels.result_holder.innerHTML = `<div>${data.first_screening_status}</div><div>${data.result.replace("The fasp status", "The additional fasp status")}</div>`
        } else {
            panels.result_holder.innerHTML = data.result;
        }
    } else {
        if (data.result instanceof (Question)) {
            objects.result_display = new QuestionDisplay(panels.result_holder, data.result);
        }
    }

    data.result = null;
}

function reset() {
    panels.result_holder.innerHTML = '';
    data = {};

    initial_question = new Question(
        "Please select the FASP anomaly:",
        constants.fasp_anomalies,
        on_choose_anomaly
    )

    objects.result_display = new QuestionDisplay(panels.result_holder, initial_question);
}

window.onload = main;