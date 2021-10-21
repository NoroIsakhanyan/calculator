(function(){
class CalcView {
    constructor(){
        this.valueEl = document.querySelector('.value');

        this.acEl = document.querySelector('.ac');
        this.pmEl = document.querySelector('.pm');
        this.percentEl = document.querySelector('.percent');

        this.additionEl = document.querySelector('.addition');
        this.subtractionEl = document.querySelector('.subtraction');
        this.multiplicationEl = document.querySelector('.multiplication');
        this.divisionEl = document.querySelector('.division');
        this.equalEl = document.querySelector('.equal');

        this.decimalEl = document.querySelector('.decimal');
        this.num0El = document.querySelector('.num-0');
        this.num1El = document.querySelector('.num-1');
        this.num2El = document.querySelector('.num-2');
        this.num3El = document.querySelector('.num-3');
        this.num4El = document.querySelector('.num-4');
        this.num5El = document.querySelector('.num-5');
        this.num6El = document.querySelector('.num-6');
        this.num7El = document.querySelector('.num-7');
        this.num8El = document.querySelector('.num-8');
        this.num9El = document.querySelector('.num-9');

        this.numberElArray = [ this.num0El, this.num1El, this.num2El, this.num3El, this.num4El, this.num5El, this.num6El, this.num7El, this.num8El, this. num9El];
    
        }
        
    setStrAsValue = (valueStr) => {
            if (valueStr[valueStr.length - 1] === '.') {
            this.valueEl.textContent += '.';
            return;
            }

            const [wholeNumStr, decimalStr] = valueStr.split('.');
            if (decimalStr) {
            this.valueEl.textContent =parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
            } 
            else {
            this.valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
            }
        }

    getValueAsStr = () => this.valueEl.textContent.split(',').join('');

    getValueAsNum = () => { return parseFloat(this.getValueAsStr()); };

    addLisenerForOperators(handler){
        this.additionEl.addEventListener('click', () => {
            handler('addition');
        });
        this.subtractionEl.addEventListener('click', () => {
            handler('subtraction');
        });
        this.multiplicationEl.addEventListener('click', () => {
            handler('multiplication');
        });
        this.divisionEl.addEventListener('click', () => {
            handler('division');
        });
        this.equalEl.addEventListener('click', () => {
            handler('equal')
        });
    }

    addLisenerForNumbers(handler){
        for (let i = 0; i < this.numberElArray.length; i++) {
            const numberEl = this.numberElArray[i];
            numberEl.addEventListener('click', () => {
            handler(i.toString());
            });
        }
    }

    addLisenerForFunctions(handler){
        this.decimalEl.addEventListener('click', () => {
            handler('.');
        });
        this.percentEl.addEventListener('click', () => {
            handler('%');
        });
        this.pmEl.addEventListener('click', () => {
            handler('±')
        });
        this.acEl.addEventListener('click', () => {
            handler('AC');
        });
        this.equalEl.addEventListener('click',()=>{
            handler('=')
        })
    }
} 

class CalcModel{
    constructor(){
        this.valueNumInMemory = null;
        this.valueStrInMemory = null;
        this.newValueNum = null;
        this.operatorInMemory = null;

    }
    setValueStrInMemory(valuestr){
        this.valueStrInMemory = valuestr;
    }

    setOperatorInMemory(operator){
        this.operatorInMemory = operator;
    }

    setvalueNumInMemory(valueNum){
        this.valueNumInMemory = valueNum;
    }

    setNewValueAsNum(valueNum){
        this.newValueNum = valueNum;
    }

    getValueStrInMemory = () => this.valueStrInMemory;

    getOperationInMemory = () => this.operatorInMemory;
    
    getValueNumInMemory = () => this.valueNumInMemory;

    getNewValueAsString = () => this.newValueNum.toString();

    getResultOfOperationAsStr = (currentValueNum) => {
        this.setvalueNumInMemory(parseFloat(this.getValueStrInMemory()));
        const valueNumInMemory = this.getValueNumInMemory()

        if (this.getOperationInMemory() === 'addition') {
            this.setNewValueAsNum(valueNumInMemory + currentValueNum);
        } 
        else if (this.getOperationInMemory() === 'subtraction') {
            this.setNewValueAsNum(valueNumInMemory - currentValueNum)
        } 
        else if (this.getOperationInMemory() === 'multiplication') {
            this.setNewValueAsNum(valueNumInMemory * currentValueNum)
        } 
        else if (this.getOperationInMemory() === 'division') {
            this.setNewValueAsNum(valueNumInMemory / currentValueNum)
        }

        return this.getNewValueAsString();
      };

    percentOperationResulAsString = (currentValueNum) =>{
        return (currentValueNum / 100).toString();
    }

    clearMemory(){
        this.valueStrInMemory = null;
        this.operatorInMemory = null;
      }
}

class Controller{
    constructor(calcModel,calcView){
        this.model = calcModel;
        this.view = calcView;
        this.handleFunctionClick = this.handleFunctionClick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
    }

    handleOperatorClick = (operation) => {
        const currentValueStr = this.view.getValueAsStr();
    
        if (!this.model.getValueStrInMemory()) {
          this.model.setValueStrInMemory(currentValueStr);
          this.model.setOperatorInMemory(operation);
          this.view.setStrAsValue('0');
          return;
        }
        this.model.setValueStrInMemory(this.model.getResultOfOperationAsStr(this.view.getValueAsNum()));
        this.model.setOperatorInMemory(operation);
        this.view.setStrAsValue('0');
      };

    handleNumberClick = (numStr) => {
        const currentValueStr = this.view.getValueAsStr();
        if (currentValueStr === '0') {
          this.view.setStrAsValue(numStr);
          return;
        } 
        this.view.setStrAsValue(currentValueStr + numStr);
      };

    handleFunctionClick(operation){
        if(operation === 'AC'){
            this.view.setStrAsValue('0');
            this.model.clearMemory();
        }
        else if(operation === '='){
                if (this.model.getValueStrInMemory()) {
                  this.view.setStrAsValue(this.model.getResultOfOperationAsStr());
                  this.model.clearMemory();
                }
        }
        else if(operation === '.'){
            const currentValueStr = this.view.getValueAsStr();
                if (!currentValueStr.includes('.')) {
                    this.view.setStrAsValue(currentValueStr + '.');
                }
        }
        else if(operation === '%'){
            const currentValueNum = this.view.getValueAsNum();
            const ValueNumAsStr = this.model.percentOperationResulAsString(currentValueNum);
            this.view.setStrAsValue(ValueNumAsStr);
            this.model.clearMemory();
        }
        else if(operation === '±'){
            const currentValueNum = this.view.getValueAsNum();
            const currentValueStr = this.view.getValueAsStr();
        
            if (currentValueStr === '-0') {
                this.view.setStrAsValue('0');
                return;
            }
            if (currentValueNum >= 0) {
                this.view.setStrAsValue('-' + currentValueStr);
            } 
            else {
                this.view.setStrAsValue(currentValueStr.substring(1));
            }
        }
      
    }

    run(){
       this.view.addLisenerForOperators(this.handleOperatorClick);
       this.view.addLisenerForNumbers(this.handleNumberClick);
       this.view.addLisenerForFunctions(this.handleFunctionClick);
    }
    
}

const view = new CalcView();
const model = new CalcModel();
const controller = new Controller(model,view);

controller.run();


})();
