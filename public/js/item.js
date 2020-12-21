
class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.props = this.state.props.props;
    }

    handleClick = (e) => {
        document.location.href = `${document.location.origin}/item?c=${this.state.props.id}`;
        localStorage.setItem("itemLoad", JSON.stringify(this.state.props))
    }

    render() {
        //this.state.props.enchanted = true;
        
        if(this.props.type == 'small') {
            return (
                <div className={((this.state.props.enchanted) ? `game_item enchanted  ${this.state.props.rarity}` : `game_item ${this.state.props.rarity}`)} onClick={this.handleClick}>
                    <img style={{ position: 'absolute', height: '100px', transform: 'rotate(130deg)', left: '-10%' }} src={`${this.state.props.image}`}></img>

                    <div className={((this.state.props.enchanted) ? `game_item_small divine` : `game_item_small ${this.state.props.rarity} `)}>
                        <h4>{this.state.props.rarity.toUpperCase() + " " + this.state.props.type.toUpperCase()}</h4>
                        <h3 style={{ fontFamily: 'Wayfinder', fontSize: '2.8em'}}>{this.state.props.name}</h3>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="campagin" onClick={this.handleClick}>
                    <div>
                       
                        <h1>
                            {this.state.props.name}
                        </h1>
                    </div>
                    
    
                    <p>{this.state.props.desc}</p>
    
                    <div className="campaign_props">
                        <div>
                            <p>YEAR</p>
                            <p>
                                {this.state.props.year}
                            </p>
                        </div>
    
                        <div>
                            <p>PLAYERS</p>
                            <p>
                                {this.state.props.players}
                            </p>
                        </div>
    
                        <div>
                            <p>STATUS</p>
                            <p>
                                {(!this.state.props.paused) ? 'PLAYING' : 'PAUSED'}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}