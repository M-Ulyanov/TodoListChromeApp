/**
 * Created by PhpStorm.
 * Author: 1
 * Project: todo list
 * Date:  28.09.2016
 * Time: 0:07
 */



'use strict';


(() => {


    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    class Calendar {


        /**
         *
         * @param root
         */
        constructor(root) {
            this.rootDOM = root;
            this._date = new Date();
            this._weekdayDOM = null;
            this._dateDOM = null;
            this._created = false;

            if(this.rootDOM) {
                this._createDOMElements();
            }
        }



        /**
         *
         */
        render() {
            if(this._created) {
                let {day, month, year} = Calendar.format(this._date);
                this._weekdayDOM.innerHTML = this.getWeekdays();
                this._dateDOM.innerHTML  = `${day}.${month}.${year}`;
            }

            return this;
        }



        getWeekdays() {
            let wday = this._date.getDay();
            if(wday === 0){
                wday = 7;
            }
            return weekdays[wday - 1];
        }



        /**
         *
         * @param action
         */
        change(action) {
            switch (action) {
                case 'prev':
                    this._date.setDate(this._date.getDate() - 1);
                    break;
                case 'next':
                    this._date.setDate(this._date.getDate() + 1);
                    break;
                default:
                    console.warn(`${action} not support!`);
            }

            //noinspection JSUnresolvedVariable
            let event = App.Utils.factoryCustomEvents('change-date');
            this.rootDOM.dispatchEvent(event);

            return this;
        }




        /**
         *
         * @returns {string}
         */
        createKeyForStorage() {
            let {day, month, year} = Calendar.format(this._date);
            return `${day}.${month}.${year}`;
        }



        /**
         *
         * @private
         */
        _createDOMElements() {
            // Weekday
            let weekdayDOM = document.createElement('div');
            weekdayDOM.classList.add('b-weekday');
            this.rootDOM.appendChild(weekdayDOM);
            this._weekdayDOM = weekdayDOM;


            // Date
            let dateDOM = document.createElement('div');
            dateDOM.classList.add('b-date');
            this.rootDOM.appendChild(dateDOM);
            this._dateDOM = dateDOM;


            // Controls
            let controlsDOM = document.createElement('div');
            controlsDOM.classList.add('container-calendar-controls');

            let controlPrevDOM = document.createElement('i');
            controlPrevDOM.className = 'b-calendar-control is-prev icon angle left';
            controlPrevDOM.addEventListener('click', (event)=> {
                event.preventDefault();
                this.change('prev');
            });
            controlsDOM.appendChild(controlPrevDOM);

            let controlNextDOM = document.createElement('i');
            controlNextDOM.className = 'b-calendar-control is-next icon angle right';
            controlNextDOM.addEventListener('click', (event)=> {
                event.preventDefault();
                this.change('next');
            });
            controlsDOM.appendChild(controlNextDOM);

            this.rootDOM.appendChild(controlsDOM);


            this._created = true;

        }



        /**
         *
         * @param date
         * @returns {{day: number, month: number, year: number}}
         */
        static format(date) {
            let day = date.getDate();
            if(day < 10) {
                day = '0' + day;
            }

            let month = date.getMonth() + 1;
            if(month < 10) {
                month = '0' + month;
            }

            let year = date.getFullYear();


            return {day, month, year}
        }


    }


    exportEnum(Calendar, 'Calendar');


})();