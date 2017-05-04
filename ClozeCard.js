var ClozeCard = function(inqury, answer) {
    this.answer = answer;
    this.inqury = inqury;
    // this.clozeDeletion = clozeDeletion;

}

ClozeCard.prototype.question = function() {
    var match = this.inqury.replace(this.answer, '...');
    return match;
}



module.exports = ClozeCard;
