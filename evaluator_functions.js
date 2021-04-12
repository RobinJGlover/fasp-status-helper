function on_choose_anomaly(response) {
    if (response === 'Serious Cardiac') {
        data.result = new Question(
            "Please specify the serious cardiac anomaly:",
            constants.fasp_serious_cardiac,
            on_choose_serious_cardiac
        )
    } else if (constants.fasp_structural_anomalies.includes(response)) {
        data.result = new Question(
            "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
            ["Yes", "No"],
            on_choose_booked_for_fa
        )
    } else if (constants.fasp_trisomy_anomalies.includes(response)) {
        data.result = new Question(
            "Was pregnancy booked in time for combined screening? (Less than 13+6 gestation)",
            ["Yes", "No"],
            on_choose_booked_for_fts
        )
    } else {
        console.error('Anomaly not found in either structural or trisomy subsets, likely misspelling.')
    }

    data.anomaly = response;

    if(data.anomaly !== 'Serious Cardiac') generate_anomaly_info();
}
// ======== Structural ========
function on_choose_serious_cardiac(response) {
    data.anomaly = response;
    generate_anomaly_info();
    data.result = new Question(
        "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
        ["Yes", "No"],
        on_choose_booked_for_fa
    )
}

function on_choose_booked_for_fa(response) {
    if (response === 'No') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Ineligible: Late/No Booking') + ".";
    } else if (response === 'Yes') {
        data.result = new Question(
            "Was a fetal anomaly scan offered when eligible?",
            ["Yes", "No"],
            on_choose_missed_fa
        )
    }
}

function on_choose_missed_fa(response) {
    if (response === 'No') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Missed Screen') + ".";
    } else if (response === 'Yes') {
        data.result = new Question(
            "Was the anomaly detected before the fetal anomaly scan?",
            ["Yes - Private", "Yes - NHS", "No"],
            on_choose_early_diagnosis_fa
        );
    }
}

function on_choose_early_diagnosis_fa(response) {
    if (response === 'Yes - Private') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Ineligible: Early Diagnosis (Private)') + ".";
    } else if (response === 'Yes - NHS') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Ineligible: Early Diagnosis') + ".";
    } else if (response === 'No') {
        data.result = new Question(
            "Did this pregnancy reach the fetal anomaly scan window?",
            ["Yes", "No - Miscarriage", "No - Termination of Pregnancy"],
            on_choose_early_loss
        )
    }
}

function on_choose_early_loss(response) {
    if (response === 'No - Miscarriage') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Ineligible: Early fetal loss') + ".";
    } else if (response == 'No - Termination of Pregnancy') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Ineligible: Early fetal loss (TOP)') + ".";
    } else if (response === 'Yes') {
        data.result = new Question(
            "Was the fetal anomaly scan completed?",
            ["Yes", "No"],
            on_choose_fa_scan_completion
        )
    }
}

function on_choose_fa_scan_completion(response) {
    if (response === 'Yes') {
        data.result = new Question(
            "Did the fetal anomaly scan detect the anomaly as per FASP detected criteria?",
            ["Yes", "No"],
            on_choose_fa_detection
        )
        //generate_anomaly_info();
    } else if (response === 'No') {
        data.result = new Question(
            "Was recall fetal anomaly scan completed?",
            ["Yes", "No"],
            on_choose_recall_fa_completion
        )
    }
}

function on_choose_fa_detection(response) {
    if (response === 'Yes') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Detected Screen +ive FA Scan') + ".";
    } else if (response === 'No') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Undetected Screen -ive FA Scan') + ".";
    }
}

function on_choose_recall_fa_completion(response) {
    if (response === 'Yes') {
        data.result = new Question(
            "Did the fetal anomaly scan detect the anomaly as per FASP detected criteria?",
            ["Yes", "No"],
            on_choose_fa_detection
        )
        //generate_anomaly_info();
    } else if (response === 'No') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Undetected incomplete screen (After recall)') + ".";
    }
}
// ============================

// ======== trisomy ===========
function on_choose_booked_for_fts(response) {
    if (response === 'Yes') {
        data.result = new Question(
            "Was combined screening offered and accepted?",
            ["Offered and accepted", "Offered and declined", "Not offered when eligible"],
            on_choose_fts_acceptance
        )
    } else if (response === 'No') {
        data.first_screening_status = "The fasp status should be: " + wrap_fasp_status('Ineligible: Late/No Booking') + ".";
        if (data.anomaly === constants.anomaly_t21) {
            data.result = new Question(
                "Was the pregnancy booked in time for quad screening?",
                ["Yes - quad accepted", "Yes - quad declined", "No"],
                on_choose_booked_for_quad
            )
        } else {
            data.result = new Question(
                "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
                ["Yes", "No"],
                on_choose_booked_for_fa
            )
        }
    }
}

function on_choose_booked_for_quad(response) {
    if (response === 'Yes - quad accepted') {
        data.result = new Question(
            "Was the quad high risk? (> 1 in 150)",
            ["Yes", "No"],
            on_choose_quad_risk
        )
    } else if ('Yes - quad declined') {
        data.result = "The additional fasp status should be: " + wrap_fasp_status('Declined Screening') + ".";
    } else if (response === 'No') {
        data.result = "The additional fasp status should be: " + wrap_fasp_status('Ineligible: Late/No Booking') + ".";
    }
}

function on_choose_quad_risk(response) {
    if (response === 'Yes') {
        data.result = "The additional fasp status should be: " + wrap_fasp_status('Detected Screen +ive Quad') + ".";
    } else if (response === 'No') {
        data.result = "The additional fasp status should be: " + wrap_fasp_status('Undetected Screen -ive Quad') + ".";
    }
}

// This assumes that for a T21 that has declined fts that they would also declined quad.
function on_choose_fts_acceptance(response) {
    if (response === 'Offered and accepted') {
        // TODO return new question was it completed, yes, no nt measurable, no nt not measurable
        data.result = new Question(
            "Was the combined screening completed?",
            ["Yes", "No - NT not measurable", "No - NT measurable"],
            on_choose_fts_completion
        )
    } else if (response === 'Offered and declined') {
        data.first_screening_status = "The fasp status should be: " + wrap_fasp_status('Declined Screening') + ".";
        if (data.anomaly === constants.anomaly_t21) {
            data.result = "The additional fasp status should be: " + wrap_fasp_status('Declined Screening') + ".";
        } else {
            data.result = new Question(
                "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
                ["Yes", "No"],
                on_choose_booked_for_fa
            )
        }
    } else if (response === "Not offered when eligible") {
        data.first_screening_status = "The fasp status should be: " + wrap_fasp_status('Missed Screen') + ".";
        if (data.anomaly === constants.anomaly_t21) {
            data.result = new Question(
                "Was the pregnancy booked in time for quad screening?",
                ["Yes - quad accepted", "Yes - quad declined", "No"],
                on_choose_booked_for_quad
            )
        } else {
            data.result = new Question(
                "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
                ["Yes", "No"],
                on_choose_booked_for_fa
            )
        }
    }
}

function on_choose_fts_completion(response) {
    if (response === 'Yes') {
        data.result = new Question(
            "Was the combined screening high risk? (> 1 in 150)",
            ["Yes", "No"],
            on_choose_fts_risk
        )
    } else if (response === "No - NT not measurable") {
        data.first_screening_status = "The fasp status should be: " + wrap_fasp_status('Undetected: incomplete screen (NT not measurable)') + ".";
        if (data.anomaly === constants.anomaly_t21) {
            data.result = new Question(
                "Was the pregnancy booked in time for quad screening?",
                ["Yes - quad accepted", "Yes - quad declined", "No"],
                on_choose_booked_for_quad
            )
        } else {
            data.result = new Question(
                "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
                ["Yes", "No"],
                on_choose_booked_for_fa
            )
        }
    } else if (response === "No - NT measurable") {
        data.first_screening_status = "The fasp status should be: " + wrap_fasp_status('Undetected: incomplete screen (NT measurable)') + ".";
        if (data.anomaly === constants.anomaly_t21) {
            data.result = new Question(
                "Was the pregnancy booked in time for quad screening?",
                ["Yes - quad accepted", "Yes - quad declined", "No"],
                on_choose_booked_for_quad
            )
        } else {
            data.result = new Question(
                "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
                ["Yes", "No"],
                on_choose_booked_for_fa
            )
        }
    }
}

function on_choose_fts_risk(response) {
    if (response === 'Yes') {
        data.result = "The fasp status should be: " + wrap_fasp_status('Detected Screen +ive combined') + ".";
    } else if (response === 'No') {
        data.first_screening_status = "The fasp status should be: " + wrap_fasp_status('Undetected Screen -ive combined') + ".";
        if (data.anomaly === constants.anomaly_t21) {
            data.result = new Question(
                "Was the pregnancy booked in time for quad screening?",
                ["Yes - quad accepted", "Yes - quad declined", "No"],
                on_choose_booked_for_quad
            )
        } else {
            data.result = new Question(
                "Was pregnancy booked in time for fetal anomaly scan? (Less than 20+6 gestation)",
                ["Yes", "No"],
                on_choose_booked_for_fa
            )
        }
    }
}
// ============================