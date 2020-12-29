
class Campaign extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.props = this.state.props.props;
    }

    handleClick = (e) => {
        localStorage.setItem("renderCampaign", this.state.props.b);
        document.location.href = `${document.location.origin}/campaign`;
    }

    render() {
        //  <img src="https://www.dndbeyond.com/avatars/17/310/636377871028699922.jpeg?width=150&height=150"></img>
        
        if(this.props.type == 'small' && this.state.props) {
            return (
                <div className="campagin linear"  style={{ width: '40%' }}onClick={this.handleClick}>
                    <div>
                        <div>
                            <h1 style={{ margin: 0 }}>
                                {this.state.props.a.name}
                            </h1>
                        </div>
                        
                        <div className="campaign_props_linear">
                            <div>
                                <p style={{ letterSpacing: '0px' }}>PLAYERS</p>
                                
                                <p>
                                    {this.state.props.a.info.players}
                                </p>
                            </div>
        
                            <div>
                                <p style={{ letterSpacing: '0px' }}>STATUS</p>
                                <p>
                                    {(!this.state.props.a.info.paused) ? 'PLAYING' : 'PAUSED'}
                                </p>
                            </div>
                        </div>
                    </div>
                
                    <a className="heavy_button">Resume</a>
                </div>
            );
        }else if(this.state.props){
            console.log(this.state.props);
            
            return (
                <div className="campagin" onClick={this.handleClick}>
                    <div>
                       
                        <h1>
                            {this.state.props.a.name}
                        </h1>
                    </div>
                    
    
                    <p>{this.state.props.a.desc}</p>
    
                    <div className="campaign_props">
                        <div>
                            <p>YEAR</p>
                            <p>
                                {this.state.props.a.info.year}
                            </p>
                        </div>
    
                        <div>
                            <p>PLAYERS</p>
                            <p>
                                {this.state.props.a.info.players}
                            </p>
                        </div>
    
                        <div>
                            <p>STATUS</p>
                            <p>
                                {(!this.state.props.a.info.paused) ? 'PLAYING' : 'PAUSED'}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }else {
            return (
                <div>You have no campaigns</div>
            )
        }
    }
}
