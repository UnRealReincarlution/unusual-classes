
class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.props = this.state.props.props;
        this.stringEnter = `Level: ${this.state.props.a.level} | ${this.state.props.a.race} | ${this.state.props.a.class}`;

        this.handleClick = this.handleClick.bind(this);
        this.hover = this.hover.bind(this);
        this.unhover = this.unhover.bind(this);
    }

    handleClick() {
        localStorage.setItem("renderCharacter", this.state.props.b);
        document.location.href = `${document.location.origin}/player`;
    }

    hover() {
        this.stringEnter = "View Character";
        this.forceUpdate();
    }

    unhover() {
        this.stringEnter = `Level: ${this.state.props.a.level} | ${this.state.props.a.race} | ${this.state.props.a.class}`;
        this.forceUpdate();
    }

    render() {
        if(this.props.type == "small") {
            return (
                <div className="player" onClick={this.handleClick} key={this.props.props.b} onMouseEnter={this.hover} onMouseLeave={this.unhover}>
                    <div>
                        {/* <img src={this.state.props.a.image}></img> */}
                        
                        <div className="center vertical" style={ { justifyContent: 'center', textAlign: 'left', padding: '15px' }}>
                            <h2>{this.state.props.a.name}</h2>
    
                            <p>{this.stringEnter}</p>
                        </div>

                        <div>
                            <div className="lightChildren item_dynamic vertical center jcenter marginLess health">
                                <h3 style={ { fontSize: '1.6em', fontWeight: '800' } }>{this.state.props.a.health.cur_health}</h3>
                                <h4>{this.state.props.a.health.max_health} HP</h4>
                            </div>
                        </div>
                    </div>                
                </div>
            );
        }else {
            return (
                <div className="player" onClick={this.handleClick} key={this.props.props.b}>
                    <div>
                        <img src="./assets/giant_slayer.png"></img>
                        
                        <div>
                            <h2>{this.state.props.a.name.toUpperCase()}</h2>
    
                            <p>Level: {this.state.props.a.level} | {this.state.props.a.race} | {this.state.props.a.class} | {this.state.props.a.age}y/o</p>
    
                            <div className="actions_player">
                                <a>View</a>
                                <a>Edit</a>
                                <a>Tree</a>
                                <a>Delete</a>
                            </div>
                        </div>
                    </div>                
                </div>
            );
        }    
    }
}

