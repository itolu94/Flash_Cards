var ClozeCard = function(answer, clozeDeletion) {
    this.answer = answer;
    this.clozeDeletion = clozeDeletion;

}

ClozeCard.prototype.question = function() {
    var match = this.answer.replace(this.clozeDeletion, '...');
    return match;
}



module.exports = ClozeCard;
