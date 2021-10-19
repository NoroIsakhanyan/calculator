(function(){class CalcView {

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
      }
      

class CalcModel{
          constructor(){
                this.valueStrInMemory = null;
                this.operatorInMemory = null;
              }
        }

        
class Controller{
        constructor(CalcModel,CalcView){
          this.view = CalcView;
          this.model =CalcModel;
        }

        setStrAsValue = (valueStr) => {
          if (valueStr[valueStr.length - 1] === '.') {
            this.view.valueEl.textContent += '.';
            return;
          }

      
         const [wholeNumStr, decimalStr] = valueStr.split('.');
          if (decimalStr) {
            this.view.valueEl.textContent =
              parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
          } else {
            this.view.valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
          }
        };

        getValueAsStr = () => this.view.valueEl.textContent.split(',').join('');

        getValueAsNum = () => {
          return parseFloat(this.getValueAsStr());
        };

        addListener(){

          this.view.percentEl.addEventListener('click', () => {
            const currentValueNum = this.getValueAsNum();
            const newValueNum = currentValueNum / 100;
            this.setStrAsValue(newValueNum.toString());
            this.setStrAsValue(newValueNum.toString());
            this.model.valueStrInMemory = null;
            this.model.operatorInMemory = null;
          });
        
          this.view.additionEl.addEventListener('click', () => {
            this.handleOperatorClick('addition');
          });
        
          this.view.subtractionEl.addEventListener('click', () => {
            this.handleOperatorClick('subtraction');
          });
        
          this.view.multiplicationEl.addEventListener('click', () => {
            this.handleOperatorClick('multiplication');
          });
        
          this.view.divisionEl.addEventListener('click', () => {
            this.handleOperatorClick('division');
          });

          this.view.acEl.addEventListener('click', () => {
            this.setStrAsValue('0');
            this.model.valueStrInMemory = null;
            this.model.operatorInMemory = null;
          });

          this.view.pmEl.addEventListener('click', () => {
            const currentValueNum = this.getValueAsNum();
            const currentValueStr = this.getValueAsStr();
        
            if (currentValueStr === '-0') {
              this.setStrAsValue('0');
              return;
            }
            if (currentValueNum >= 0) {
              this.setStrAsValue('-' + currentValueStr);
            } else {
              this.setStrAsValue(currentValueStr.substring(1));
            }
          });
        
          this.view.equalEl.addEventListener('click', () => {
            if (this.model.valueStrInMemory) {
              this.setStrAsValue(this.getResultOfOperationAsStr());
              this.model.valueStrInMemory = null;
              this.model.operatorInMemory = null;
            }
          });

          for (let i = 0; i < this.view.numberElArray.length; i++) {
            const numberEl = this.view.numberElArray[i];
            numberEl.addEventListener('click', () => {
              this.handleNumberClick(i.toString());
            });
          }
        
          this.view.decimalEl.addEventListener('click', () => {
           const currentValueStr = this.getValueAsStr();
           console.log(currentValueStr);
            if (!currentValueStr.includes('.')) {
              this.setStrAsValue(currentValueStr + '.');
            }
          });
         }
        
        handleNumberClick = (numStr) => {
          const currentValueStr = this.getValueAsStr();
          if (currentValueStr === '0') {
            this.setStrAsValue(numStr);
          } else {
            this.setStrAsValue(currentValueStr + numStr);
          }
        };

        getResultOfOperationAsStr = () => {
         const currentValueNum = this.getValueAsNum();
          const valueNumInMemory = parseFloat(this.model.valueStrInMemory);
          let newValueNum;
          if (this.model.operatorInMemory === 'addition') {
            newValueNum = valueNumInMemory + currentValueNum;
            console.log(newValueNum);
          } else if (this.model.operatorInMemory === 'subtraction') {
            newValueNum = valueNumInMemory - currentValueNum;
            console.log(newValueNum);
          } else if (this.model.operatorInMemory === 'multiplication') {
            newValueNum = valueNumInMemory * currentValueNum;
            console.log(newValueNum);
          } else if (this.model.operatorInMemory === 'division') {
            newValueNum = valueNumInMemory / currentValueNum;
            console.log(newValueNum);
          }
      
          return newValueNum.toString();
        };

        handleOperatorClick = (operation) => {
          const currentValueStr = this.getValueAsStr();
      
          if (!this.model.valueStrInMemory) {
            this.model.valueStrInMemory = currentValueStr;
            this.model.operatorInMemory = operation;
            this.setStrAsValue('0');
            return;
          }
          this.model.valueStrInMemory = this.getResultOfOperationAsStr();
          this.model.operatorInMemory = operation;
          this.setStrAsValue('0');
        };
      }


    const view = new CalcView();
    const model = new CalcModel();
    const controller = new Controller(model,view);

    controller.addListener();

    })();