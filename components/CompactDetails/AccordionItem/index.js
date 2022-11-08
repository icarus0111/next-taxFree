class AccordionItem extends React.Component {
  state = {
    opened: false
  }

  componentDidMount(){
    // allows for the first accordion item to be opened initially
    if(!this.props.position){
      this.setState({opened:true})
    }
  }

  render () {
    const {
      props: {
        details,
        title,
        id,
        selector
      },
      state: {
        opened
      }
    } = this

    return (
      <div
      id={selector}
        {...{
          className: `accordion-item, ${opened && 'accordion-item--opened'}`,

          onClick: () => { this.setState({ opened: !opened }) }
        }}
      >
        <div {...{ className: 'accordion-item__line' }}>
          <h3{...{ className: 'accordion-item__title  accordion-item__line regular-font card-title' }}>
            {title}
          </h3>
          <span {...{ className: 'accordion-item__icon' }}/>
        </div>
          <div {...{ className: 'accordion-item__inner' }}>
            <ul {...{ className: 'accordion-item__content' }}>
            {details.map((detail,i)=><li className="accordion-item__content-detail regular-font" key={i}>{detail}</li>)}
            </ul>
          </div>
      </div>
    )
  }
}

export default AccordionItem
