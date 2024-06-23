class Currency{
     #dollarValue = 0;
     #amount = 0;
     #name = null;

     constructor(dollaValue, currencyName){
          this.dollaValue = dollaValue;
          this.currencyName = currencyName;
     }

     /* Amount */
     set amount(newAmount){
          newAmount = parseFloat(newAmount);
          if (isNaN(newAmount)) throw 'Invalid Amount'
          this.#amount = newAmount;
     }

     get amount(){
          return this.#amount;
     }

     /* Dollar Value */
     set dollaValue(newValue){
          newValue = parseFloat(newValue);
          if (isNaN(newValue)) throw 'Invalid Value'
          this.#dollarValue = newValue;
     }

     get dollaValue(){
          return this.#dollarValue
     }

     /* Currency Name */
     get currencyName(){
          return this.#name;
     }

     set currencyName(newName){
          if(typeof(newName) !== 'string' || newName==='')throw 'Invalid currency name';
          this.#name = newName
     }

     transformCurrency(currency){
          return (this.#dollarValue * this.#amount) / currency.dollaValue;
     }
}

/* Currencies */
//Vector Moneda
const Currencies = [
     new Currency(1,'Dolar'),
     new Currency(0.055,'Peso Mexicano'),
     new Currency(0.00024,'Peso Colombiano'),
     new Currency(1.07, 'Euros'),
     new Currency(0.028,'Bolivar Venezolano')
];
const Criptos= [
     new Currency(63671.557, 'Bitcoin'),
     new Currency(3421.4681, 'Ethereum'),
     new Currency(584.87, 'BNB'),
     new Currency(131.76, 'Solana'),
     new Currency(1, 'Tether'),
];

const AddOptionsToSelect = ({selectId, currencies = []})=>{
     const Template = document.createDocumentFragment();
     const Select = document.querySelector(`#${selectId}`);
     const DefaultOption = document.createElement('option');

     /* Set default option */
     DefaultOption.setAttribute('value', '-')
     DefaultOption.setAttribute('selected', '')
     DefaultOption.textContent = '-- Selecciona una Divisa --';

     /* Add default option to template */
     Template.appendChild(DefaultOption);

     /* Add currencies to template */     
     currencies.forEach((currency, i)=>{
          const Option = document.createElement('option');
          /* Set properties */
          Option.setAttribute('value',i);
          Option.textContent = currency.currencyName;
          /* add Option */
          Template.appendChild(Option)   
     })
     /* add to template */
     Select.append(Template.cloneNode(true));     
}

const AddMessage = ({isPositiveMessage = false, message = 'Gracias'})=>{
     const Alert = document.createElement('div');
     const Message = document.createTextNode(message);
     const GetClass = (isSuccess) => (isSuccess) ? 'alert-success': 'alert-danger';
     
     /* Set atributtributes */
     Alert.classList.add('text-center', 'alert');
     Alert.classList.add(GetClass(isPositiveMessage));
     Alert.classList.remove(GetClass(!isPositiveMessage));

     /* Append Elemnts */
     Alert.appendChild(Message);
     document.querySelector('#principal').appendChild(Alert);

     /* Add Events */
     setTimeout(function() {
          document.querySelector('#principal .alert').remove();
     }, 3000);
}

const CalculateCurrency = (e)=>{
     e.preventDefault();
     const Form = e.target;
     const Value = Form.amount.value;
     const CurrencyIndex = Form.moneda.value; 
     const CriptoIndex = Form.criptomoneda.value;      
     const Currency = Currencies[CurrencyIndex];
     const Cripto = Criptos[CriptoIndex];
     /* Show Alert */
     if(
          CriptoIndex === '-' || 
          CurrencyIndex ==='-' || 
          isNaN(CurrencyIndex) ||
          isNaN(CriptoIndex) ||
          ! Currency ||
          ! Cripto ||
          Value < 0 
     ){
          AddMessage({message:'Debe seleccionar una divisa e ingresar una cantidad'});
          return;
     }

     Currency.amount = Value;
     let conversion = Currency.transformCurrency(Cripto);

     AddMessage({
          isPositiveMessage:true, 
          message: `
               El valor de ${Currency.currencyName} a la 
               criptomoneda ${Cripto.currencyName} 
               es de: ${conversion.toFixed(10)}`
     })
     
     formulario.reset();
}

document.addEventListener('DOMContentLoaded',()=>{
     /* Add Currencies */
     AddOptionsToSelect({
          selectId:'moneda',
          currencies:Currencies
     });
     /* Add Criptos */
     AddOptionsToSelect({
          selectId:'criptomoneda',
          currencies:Criptos
     });

     /* Add form event */
     document.querySelector('#formulario')
          .addEventListener('submit', CalculateCurrency);
})