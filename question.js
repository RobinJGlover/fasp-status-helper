class Question {
    constructor(question, option_labels, evaluator_func) {
        this.question = question;
        this.option_labels = option_labels;
        this.evaluator_func = evaluator_func;
    }
}