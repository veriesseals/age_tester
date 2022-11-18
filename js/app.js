/**
 * Build AGE TESTER
 * 
 * Dynamically return currrent date
 * 
 * Callect Input from the form
 * 
 * Validate the form
 * 
 * Extract month, day, year from input
 * 
 * Test input to current date
 * 
 * return result
 * 
 * if the difference in birth year and current year is greater than 21 => access granted
 * 
 * else if the difference in birth year and current year is = 21: 
 * 
 * if the difference in birth month and current month is > 0 => access granted else if the diffrence in birth month and current month is equal to 0:
    * if the difference in birthdate and current date are >=0 => access granted
    * else => access denied
    * else access denied
 * else access denied
 */

let bornBefore = document.getElementById('bornBefore');
let today = new Date();
// console.log(today);
bornBefore.innerText = `${today.getMonth()+1 }-${today.getDate()+1}-${today.getFullYear()-21}`;

bornBefore.style.color ='red';

class Tester {
    constructor() {
        this.ageData = {
            date:'',
            month:'',
            year:'',
            currYear:'',
            currMonth:'',
            currDay:''
        }
    }

    // Initialize Button 
    init() {
        this.formSubmit();
    }

    // -----------------------------------------------
    // Button
    formSubmit() {
        let form = document.getElementById('form');
        form.addEventListener('submit', (e)=> {
            e.preventDefault()
            // console.log('click');
            this.setAge();
        })
    }

    
    setAge() {
        // get current date
        let currDate = new Date();
        // console.log(currDate);
        let currMonth = currDate.getMonth()+1;
        let currDay = currDate.getDate();
        let currYear = currDate.getFullYear();

        // get dob from input
        let dob = document.getElementById('dob').value;
        // console.log(dob);
        let birthYear= parseInt(dob.slice(0,4));
        let birthMonth= parseInt(dob.slice(5,7));
        let birthDay= parseInt(dob.slice(8,10));
        // console.log(birthMonth, birthDay, birthYear);
        this.ageData = {
            date: birthDay,
            month: birthMonth,
            year: birthYear,
            currDay: currDay,
            currMonth: currMonth,
            currYear: currYear
        }
        // console.log(this.ageData);
        this.ageTest();
    }

    // Access Granted
    accessGranted(access) {
        let display = document.getElementById('display');

        // Styling
        let granted = {
            color: 'green',
            textTransform: 'capitalize'
        }

        let denied = {
            color: '#f00',
            textTransform: 'capitalize'
        }


        // Conditional
        if (access == 'denied') {
            display.innerText = 'access denied';
            for(let prop in denied){
                display.style[prop] = denied[prop];
            }
        }else if(access == 'granted'){
            display.innerText = 'access granted';
            for(let prop in granted){
                display.style[prop] = access[prop];
            }
        }else {
            display.innerText = 'error';
        }
    }


    // Testing Method
    ageTest(){
        let yearTest = this.ageData.currYear - this.ageData.year;
        // console.log(yearTest);
        let monthTest = this.ageData.currMonth - this.ageData.month;
        let dayTest = this.ageData.currDay - this.ageData.date;

        // -----------------------------------------------------
        // Conditionals for Year Test
        if (yearTest > 21) {
            this.accessGranted('granted');
        } else if(yearTest === 21) {
            if(monthTest > 0) {
                this.accessGranted('granted');
            } else if (monthTest === 0){
                if(dayTest >= 0) {
                    this.accessGranted('granted');
                } else {
                    this.accessGranted('denied');
                }
            } else {
                this.accessGranted('denied');
            }
        } else {
            this.accessGranted('denied');
        };
    };

};


// ---------------------------------------------------
// Testers
let action = new Tester();
action.init();
