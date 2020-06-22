import React from 'react';
import moment from 'moment';
import './calendar.css';


export default class Calendar extends React.Component {
  state = {
     dateContext: moment(),
     today: moment(),
  }
  constructor(props) {
     super(props);
       
  }
   
     weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
     months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



    year = () => {
      return this.state.dateContext.format("Y");
     }
    month = () => {
      return this.state.dateContext.format("MMMM");
     }
    daysInMonth = () => {
      return this.state.dateContext.daysInMonth();
     }

  currentDate = () => {
      return this.state.dateContext.daysInMonth("date");
  }

  currentDay = () => {
      return this.state.dateContext.format("D");
  }
 
    firstDayOfMonth = () => {
      let dateContext = this.state.dateContext;
      let firstDay = moment(dateContext).startOf('month').format('d');
      return firstDay; }

   setMonth = (month) => {
      let monthNo = this.months.indexOf(month);
      let dateContext = Object.assign({}, this.state.dateContext);
      dateContext = moment(dateContext).set("month", monthNo);
      this.setState({
         dateContext: dateContext
      }); 
      } 


   nextMonth = () => {
      let dateContext = Object.assign({}, this.state.dateContext);
      dateContext = moment(dateContext).add(1, "month");
      this.setState({
           dateContext: dateContext
      });
      this.props.onNextMonth && this.props.onNextMonth();
    }


    prevMonth = () => {
      let dateContext = Object.assign({}, this.state.dateContext);
      dateContext = moment(dateContext).subtract(1, "month");
      this.setState({
           dateContext: dateContext
      });
      this.props.onPrevMonth && this.props.onPrevMonth();
    }
   
 
   setYear = (year) => {
       let dateContext = Object.assign({}, this.state.dateContext);
       dateContext = moment(dateContext).set("year", year);
       this.setState({
            dateContext: dateContext
       })
   }

   onAddYear = (e) => {
        if (e.which === 13) {
             this.setYear(e.target.value);
             this.setState({
                   showYearNav: false })
             }
   }


render() {

    let weekdays = this.weekdaysShort.map((day) => {
       return (
             <td key ={day} className="week-day">{day}</td>
          ) 
     });
       
     let fill = [];
        for (let i = 0; i< this.firstDayOfMonth(); i++) {
        fill.push(<td className="emptySlot">
        {""}
                 </td>
              );
          }    
    

    let daysInMonth = [];
    for (let d=1; d < this.daysInMonth()+1; d++) {
       let currentday = (d == this.currentDay() ? "day current-day" : "day");
       daysInMonth.push(
       <td key={d} className={currentday} >
       <span>
         {d}</span>
       </td>); 
     }
    
    var totalSlots = [...fill, ...daysInMonth];
    
    let rows = [];
    let cells = [];
     
    totalSlots.forEach((row, i)=> {
       if((i%7) === 0) {
          let insertRow = cells.slice();
          rows.push(insertRow);
          cells = [];
          cells.push(row);
   
          
       } else {        
           cells.push(row); }
       if (i === totalSlots.length -1){
          let insertRow = cells.slice();
          rows.push(insertRow);}


     });
     
    let dates = rows.map((d, i)=> {
          return  (
              <tr>
              {d}
              </tr>
     );
    }) 

    

    return (
      <div className="calendar-container">
        <table className= "calendar">
           <thead>
                <tr className="calendar-header">
                    <td className= "yearmonth" colSpan="5">
                        <this.month />
                        {" "}
                        <this.year  />
                    </td>
                    <td colSpan="2" className="nav-month">                  
                      <button type="button" className= "nav-prev"  onClick={(e)=> {this.prevMonth()}} id="prev">
                          &lt;</button>
                      <button type="button" className="nav-next"  onClick={(e)=> {this.nextMonth()}} id="next">
                          &gt;</button>
                    </td>                   
                </tr>
           </thead>
           <tbody className="days">
                  {weekdays}    
                  {dates}
            </tbody>
        </table>                 
      </div> 
    );
  }
}
