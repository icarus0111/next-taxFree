import React, {Component} from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

import './main.scss'

const stateDetails = {
    Arizona:{sales:.078,property:.0072},
    California:{sales:.0875,property:.0077},
    Colorado:{sales:.065,property:.0054},
    Florida:{sales:.075,property:.0098},
    Georgia:{sales:.065,property:.0083},
    Kansas:{sales:.085,property:.0091},
    Missouri:{sales:.088,property:.0091},
    Nevada:{sales:.072,property:.0069},
    Texas:{sales:.072,property:.0181},
    TaxFreeRV:{initial:1310.00, yearly:440, sales:.005}
  }


// initial 895+320+95   yearly 140/yr+300

class Chart extends Component{
 constructor(props){
   super(props)
   this.state={
     value:100000
   }
 }

 componentDidMount(){
   this.setData()
 }

 handleChange = (e) => {
   this.setState({value:Number(e.target.value.replace(/\D/g, ''))})
 }

setData = () => {
  let data = []
  const value = this.state.value
  for(let year = 0; year<=5; year++){
    let detail = {name:"Year " + year }
    Object.keys(stateDetails).map(state=>{
      //initial or yearly property indicates its taxfree rv rates
      let { sales, property, initial, yearly  }  = stateDetails[state]
      let cost = initial? (value*sales) +initial + (yearly*year) : ( value * sales ) + (( value * property)*(year+1))
      detail[state] = Math.round(cost)
    })
    data.push(detail)
  }

  this.setState({data})
}


 render(){
   let value = toLocaleString
 		return (
      <div className='chart-wrapper' id="expenses-chart">
        <div className="chart-container">
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={300}
              data={this.state.data||[]}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left"
                  tickFormatter={ val => `$${val.toLocaleString()}`}
                />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                 formatter={(value) => new Intl.NumberFormat('en').format(value)}
                />
                <Legend />
                <Line  yAxisId="left" type="monotone" dataKey="TaxFreeRV" stroke="#43C59E" />
                <Line yAxisId="left" type="monotone" dataKey="California" stroke="#8884d8"  />
                <Line yAxisId="left" type="monotone" dataKey="Colorado" stroke="#FF6978" />
                <Line yAxisId="left" type="monotone" dataKey="Arizona" stroke="#6D435A" />
                <Line yAxisId="left" type="monotone" dataKey="Florida" stroke="#F5853F" />
                <Line yAxisId="left" type="monotone" dataKey="Georgia" stroke="#414073" />
                <Line yAxisId="left" type="monotone" dataKey="Kansas" stroke="#C45BAA" />
                <Line yAxisId="left" type="monotone" dataKey="Missouri" stroke="#9A031E" />
                <Line yAxisId="left" type="monotone" dataKey="Nevada" stroke="#FCDC4D" />
                <Line yAxisId="left" type="monotone" dataKey="Texas" stroke="#17BEBB" />
              </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-input-container">
            <p className="header-font chart-input-container-header">{`Compare State Cost`}</p>

            <p className="regular-font">{`Provide your Recreational Vehicle's value to see your potential savings with a Montana LLC compared to some of these other states`}</p>
            <div className='chart-input-content-container'>
              <form onSubmit={(e)=>{
                e.preventDefault()
                this.setData()
              }}>
                <span>$</span>
                <input
                  className="chart-input regular-font"
                  placeholder="Vehicle Value"
                  onChange ={this.handleChange}
                  value={this.state.value.toLocaleString()}
                / >
                <button
                   className='chart-form-btn regular-font'
                   onClick={()=>{this.setData()}}
                   >
                    Check
                </button>
              </form>
            </div>
            <p className="regular-font chart-disclaimer">{`*Estimate Disclaimer: The estimates available here are provided with quoted average yearly state sales and property tax cost. These may not be actual reflections of cost for each state. Please contact us for questions if your state is not listed or any further questions on the estimates listed`}</p>
          </div>
        </div>
      )
   }
}
export default Chart
