var BasicCard = function(front, answer) {
    this.front = front
    this.question = function() {
       return this.front;
    }
    this.answer = answer;
}


module.exports = BasicCard
