let data, objects, panels;
function main() {
    data = {};
    objects = {};
    panels = {};

    panels.result_holder = _select("result_holder");

    panels.fasp_detected_panel = _select("fasp_detected_panel");
    panels.fasp_detected_header = _select('fasp_detected_header');
    panels.fasp_detected_criteria_holder = _select('fasp_detected_criteria_holder');

    panels.validations_panel = _select('validations_panel');
    panels.validations_holder = _select('validations_holder');

    reset();
}

function evaluate() {
    generate_validations(data.first_screening_status, data.result)

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
        generate_validations(data.first_screening_status, data.result);
    } else {
        if (data.result instanceof (Question)) {
            objects.result_display = new QuestionDisplay(panels.result_holder, data.result);
        }
    }

    data.result = null;
}

function reset() {
    data = {};

    panels.result_holder.innerHTML = '';

    panels.fasp_detected_panel.style.display = 'none';
    panels.fasp_detected_criteria_holder.innerHTML = '';

    panels.validations_panel.style.display = 'none';
    panels.validations_holder.innerHTML = '';

    initial_question = new Question(
        "Please choose the FASP anomaly:",
        constants.fasp_structural_anomalies.concat(constants.fasp_trisomy_anomalies),
        on_choose_anomaly
    )

    objects.result_display = new QuestionDisplay(panels.result_holder, initial_question);

    generate_validations(); // No parameters so just pulls 'common' fasp validations.
}

window.onload = main;