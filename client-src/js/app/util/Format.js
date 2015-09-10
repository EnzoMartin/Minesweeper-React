module.exports = {
    /**
     * Format a number and add commas
     * @param number Number
     * @returns {string}
     */
    niceNumber: function(number){
        number = String(number);
        var formattedNumber = '';
        var len = number.length;
        var i = 0;

        while(i < len){
            if(i % 3 === 0){
                formattedNumber += ',';
            }
            formattedNumber += number[i];
            i++;
        }

        return formattedNumber;
    }
};