import AccordionItem from '../AccordionItem'

const data = [
  {
    title: 'How It Works',
    details:[
        "Depending on your state’s statutes, paying state taxes when you are going to be  out of your home state a significant amount of time may not be required.",
        "Montana has no sales tax.",
        "Montana has no vehicle inspections. Your vehicle never needs to visit Montana (Salvaged vehicles may have additional requirements, please contact us if that is the case).",
        "We will form a Limited Liability Company (LLC) in Montana for you.",
        "You will then have your LLC to buy your RV.",
        "The tax liability will move to Montana once your LLC takes ownership and registers the vehicle. Because Montana has no sales tax, you will only pay for the registration!",
        "RV and motorhome registrations in Montana are based on the year and body style."
      ],
      selector:"#how-it-works"
  },
  {
    title: 'Registration Costs & Services',
    details:[
      "$895.00 -- New Company formation (1-time fee)",
      "$250.00 -- Add additional vehicles (per vehicle)",
      "$140.00 -- Annual Renewal fee (access to our full-service office)",
      "$40.00 -- Private Mail Box (optional)",
      "$25.00 -- Shipping",
      "$95.00 -- LLC filing fee (1-time fee)",
      "$20.00 -- Annual LLC filing fee (every year, year 2 and beyond)",
      "Motor homes: $325.25 per year for brand new to $279.25 for 8 years old",
      "5th Wheel (over 16’ long): $191 for a permanent tag",
      `Regular vehicles including SUV’s: Variable & call us for a quote.
Note: For vehicles with an original MSRP cost of over $300,000, a luxury tax applies`
    ],
    selector:"#registration-cost"

  },
  {
    title: 'RV Financing',
    details:[
      'Financing through a Montana Limited Liability Company (LLC) is specialized. If you have a bank you were planning to work with, particularly if the bank is through a dealer, they almost certainly will not fund your loan through the Montana LLC.',

      'Don’t worry, this only means that you need to work with a lender that will work with your LLC and not increase your interest rate on the loan to do so! Here’s how to do it',
      'Credit Unions that work with businesses in your resident state are happy to work with Montana LLC’s. Also, Credit Unions typically offer better RV and auto loan rates than traditional banks. TaxFreeRV has identified Credit Unions in your home state that will work with LLC’s and we are happy to refer them when you are ready. Just give us a call!',

      'Additional 1-time service charge for White Glove Service is $300. Any additional governmental fees required as part of the vehicle loan is charged to you at the exact amount of the fee, if applicable.'
    ],
    selector:"#rv-financing"

  },

  {
    title: 'White Glove Service',
    details:[
      'If you would like to leave all the details to us, TaxFreeRV offers White Glove Service to deal with everything related to your RV financing. This additional service offering includes:',

      'TaxFreeRV gathers all the basic information we can that your lender will need to get the ball rolling',

      'We contact who we believe will be the best credit union for your particular profile, supply them with your basic information, and the lender will then contact you directly with a full understanding of the loan through your LLC in advance and get right down to business!',

      'We file any additional forms required by your home state related to this loan and coordinate and transmit any and all required forms directly to your lender',

      'We check in with you and your lender to be sure everything is proceeding and confirm that every detail is properly managed with your LLC and your vehicle loan.',

      'Additional 1-time service charge for White Glove Service is $300. Any additional governmental fees required as part of the vehicle loan is charged to you at the exact amount of the fee, if applicable.'
    ],
    selector:"#services"

  },

  {
    title: 'Legality',
    details:["If you meet your State’s conditions this is a completely legal arrangement. Literally thousands of happy customers have taken advantage of this unique, legal opportunity.","Conditions vary from state to state, but virtually every state’s statutes makes this opportunity legal.","It is important that if you have questions regarding your situation, you contact an attorney licensed in your state of residency to determine your specific requirements.","Please call our office, or submit an online request and we will be happy to provide you with additional information regarding your particular state of residency."],
    selector:"legality"
  },
  {
    title: 'Insurance',
    details:['Insurance is simple and easy. Let your insurance carrier know to list your vehicle on your existing policy and you (and others if applicable, i.e. spouse) as the insured and your Montana Limited Liability Company as the additional insured, or if they prefer the company as the insured and you as the additional insured. If your insurance agent is not familiar with this arrangement, let us know and we can talk to your agent or refer you to an agent that does these regularly.'],
    selector:"#insurance"
  }
]

class Accordion extends React.Component {
  render () {
    return (
      <div {...{ className: 'wrapper' }}>
        <div {...{ className: 'accordion-list' }}>
          {data.map((data, id) => {
            return (
              <div key={id} {...{ className: 'accordion-list__item' }}>
                <AccordionItem {...data}  position={id}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Accordion
