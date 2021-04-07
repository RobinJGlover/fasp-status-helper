let data, objects, panels;
function main() {
    data = {};
    objects = {};
    panels = {};
    
    panels.question_holder = _select("question_holder");

    initial_question = new Question(
        "Please select the anomaly type.",
        [
            new QuestionOption("Anencephaly", ()=>{on_choose_condition_struc('Anencephaly')}),
            new QuestionOption("Bilateral Renal Agenesis",()=>{on_choose_condition_struc('Bilateral Renal Agenesis')}),
            new QuestionOption("Cleft Lip", ()=>{on_choose_condition_struc('Cleft Lip')}),
            new QuestionOption("Congenital Diaphragmatic Hernia", ()=>{on_choose_condition_struc('Congenital Diaphragmatic Hernia')}),
            new QuestionOption("Down's Syndrome"),
            new QuestionOption("Edward's Syndrome"),
            new QuestionOption("Exomphalos", ()=>{on_choose_condition_struc('Exomphalos')}),
            new QuestionOption("Gastroschisis", ()=>{on_choose_condition_struc('Gastroschisis')}),
            new QuestionOption("Lethal Skeletal Dysplasia", ()=>{on_choose_condition_struc('Lethal Skeletal Dysplasia')}),
            new QuestionOption("Patau's Syndrome"),
            new QuestionOption("Serious Cardiac", ()=>{on_choose_condition_struc('Serious Cardiac')}),
            new QuestionOption("Spina Bifida", ()=>{on_choose_condition_struc('Spina Bifida')}),
        ]
    );

    objects.question_display = new QuestionDisplay(panels.question_holder, initial_question);
}

function evaluate() {
    console.log(data);
    panels.question_holder.innerHTML = '';

    if(data.result = )

    objects.question_display = new QuestionDisplay(panels.question_holder, data.queued_question);

    data.queued_question = null;
}

window.onload = main;