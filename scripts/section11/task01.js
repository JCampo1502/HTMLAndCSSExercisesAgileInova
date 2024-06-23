

class Observable{
    #observers = new Set();
    suscribe(newObserver){
        this.#observers.add(newObserver);
    }
    unsuscribe(newObserver){
        this.#observers.delete(newObserver);
    }

    update(newState){        
        this.#observers.forEach(observer => observer.update(newState));
    }
}

class Observer{
    #update = null;
    constructor(fn){
        this.#update = fn
    }

    update(newState){
        this.#update(newState);
    }
}

class Person {
    static #Persons = new Set;
    static get Persons(){
        return Person.#Persons;
    }

    #name = null;
    #lastName = null;
    #birthDay = null;
    #adress = null;
    #city = null;
    #phoneNumber = null;
    #email = null;

    set name(newVal = null){
        if(!newVal || typeof(newVal) != 'string' || newVal == '' || newVal.length > 30)throw "Valor Invalido";
        this.#name = newVal;
    }
    set lastName(newVal = null){
        if(!newVal || typeof(newVal) != 'string' || newVal == '' || newVal.length > 30)throw "Valor Invalido";
        this.#lastName = newVal;
    }
    set birthDay(newVal = null){        
        const CurrentDate = new Date();
        if(!newVal || typeof(newVal) != 'string' || newVal == '')throw "Valor Invalido";
        let birthDay = new Date(newVal)
        if(!birthDay || birthDay > CurrentDate)throw "Valor Invalido";
        this.#birthDay = newVal;
    }
    set adress(newVal = null){
        if(!newVal || typeof(newVal) != 'string' || newVal == '' || newVal.length > 50)throw "Valor Invalido";
        this.#adress = newVal;
    }
    set city(newVal = null){
        if(!newVal || typeof(newVal) != 'string' || newVal == '' || newVal.length > 50)throw "Valor Invalido";
        this.#city = newVal;
    }
    set phoneNumber(newVal = null){
        const RegPhone = /^(?:\+57)?[ -]?(?:3\d{2}|6\d{2}|7\d{2})[ -]?\d{3}[ -]?\d{4}$/;
        if(!newVal || typeof(newVal) != 'string' || newVal == '' || !RegPhone.test(newVal))throw "Valor Invalido";
        this.#phoneNumber = newVal;
    }
    set email(newVal = null){
        const RegEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!newVal || typeof(newVal) != 'string' || newVal == '' || newVal.length > 100 || !RegEmail.test(newVal))throw "Valor Invalido";
        this.#email = newVal;
    }

    get data(){
        return {
            name: this.#name,
            lastName: this.#lastName,
            birthDay: this.#birthDay,
            adress: this.#adress,
            city: this.#city,
            phoneNumber: this.#phoneNumber,
            email: this.#email,
        }
    }    

    static addPerson(person, $observer){
        Person.#Persons.add(person);
        $observer.update(Person.Persons);
    }


    static removePerson(person, $observer){
        Person.#Persons.delete(person);        
        $observer.update(Person.Persons);

    }    


    static createNewPerson({
        name = null,
        lastName = null,
        birthDay = null,
        adress = null,
        city = null,
        phoneNumber = null,
        email = null
    }){
        try {
            const NewPerson = new Person();
            NewPerson.name = name;
            NewPerson.lastName = lastName;
            NewPerson.birthDay = birthDay;
            NewPerson.adress = adress;
            NewPerson.city = city;
            NewPerson.phoneNumber = phoneNumber;
            NewPerson.email = email;
            return NewPerson
        } catch (error) {
            return {
                error
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
        const $Persons = new Observable();        
        const $List = new Observer((state)=>{                        
            const Table = document.querySelector('.table tbody');
            Table.innerHTML = '';
            state.forEach(person=>{
                const Data = person.data;
                const Row = document.createElement('tr');
                const Cell = document.createElement('td');
                const DeleteBtn = document.createElement('button');
                
                Cell.classList.add('col');
                DeleteBtn.classList.add('btn','btn-danger');                
                DeleteBtn.addEventListener('click', ()=>{                    
                    Person.removePerson(person, $Persons);
                })

                Row.innerHTML = /* html */`
                    <td scope="col">${Data.name + ' ' + Data.lastName}</td>
                    <td scope="col">${Data.birthDay}</td>
                    <td scope="col">${Data.adress}</td>
                    <td scope="col">${Data.city}</td>
                    <td scope="col">${Data.phoneNumber}</td>
                    <td scope="col">${Data.email}</td>                    
                `;       
                
                DeleteBtn.textContent = 'Eliminar';
                Cell.appendChild(DeleteBtn);
                Row.appendChild(Cell);
                Table.append(Row);
            })
        
        });
        $Persons.suscribe($List);

        document.querySelector('.main__form')
            .addEventListener('submit', (e)=>{
                e.preventDefault();
                e.stopPropagation();                
                if(!e.target.checkValidity())return;
                const Form = e.target;
                const Data = {
                    name:Form.name.value,
                    lastName:Form.lastname.value,
                    birthDay:Form.birthday.value,
                    adress:Form.adress.value,
                    city:Form.city.value,
                    phoneNumber:Form.phone.value,
                    email:Form.email.value
                }                
                const NewPerson = Person.createNewPerson(Data); 
                if(NewPerson.error){
                    alert(NewPerson.error);
                    return;
                }
                Person.addPerson(NewPerson, $Persons);
                e.target.reset();
            });
    
})