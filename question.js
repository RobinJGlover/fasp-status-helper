class Question {
    constructor(q, options) {
        this.label = q;
        this.options = options;
    }
}

class QuestionOption {
    constructor(label, on_choose) {
        this.label = label;
        if(on_choose === undefined) {
            on_choose = ()=>{console.log(this.label)}
        }
        this.on_choose = on_choose;
    }
}

function on_choose_condition_struc(anom) {
    data.anomaly = anom;
    data.anomaly_type = 'Structural'
    data.queued_question = new Question(
        "Was the pregnancy booked in time for fetal anomaly scan?",
        [
            new QuestionOption("Yes", ()=>{on_booked_in_time('Yes')}),
            new QuestionOption("No", ()=>{on_booked_in_time('No')}),
            new QuestionOption("Unsure", ()=>{on_booked_in_time('Unsure')}),
        ]
    )
    evaluate();
}

function on_booked_in_time(opt) {
    if(opt === 'Unsure') {
        
    }
}