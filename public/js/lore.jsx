
class Lore extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };

        this.stringEnter = this.state.props.props.a.simple_body.substring(0, 25) + "...";

        this.handleClick = this.handleClick.bind(this);
        this.hover = this.hover.bind(this);
        this.unhover = this.unhover.bind(this);
    }

    handleClick() {
        localStorage.setItem("renderCharacter", this.state.props.b);

        if(this.state.props.props.a.author == auth.currentUser.uid) {

            document.location.href = `${document.location.origin}/create_lore?e=${this.state.props.props.b}`;
        }else {
            document.location.href = `${document.location.origin}/lore`;
        }
        
    }

    hover() {
        if(this.state.props.props.a.author == auth.currentUser.uid && this.state.props.props.a.type !== "published") {
            this.stringEnter = "Edit Lore 🠒"
        }else {
            this.stringEnter = "View Lore 🠒"
        }

        this.forceUpdate();
    }

    unhover() {
        this.stringEnter = this.state.props.props.a.simple_body.substring(0, 25) + "...";
        this.forceUpdate();
    }

    render() {
        console.log(this);

        return (
            <div className="player lore" onClick={this.handleClick} key={this.props.props.b} onMouseEnter={this.hover} onMouseLeave={this.unhover}>
                <div>
                    <div className="center vertical" style={ { justifyContent: 'center', textAlign: 'left', padding: '15px' }}>
                        <div className="linear space_between width100">
                            <h2>{this.state.props.props.a.title}</h2>
                        </div>

                        <div className="linear space_between width100 center">
                            <p>{this.stringEnter.substring(0, 25)}</p>
                            {(this.state.props.props.a.type == "draft") ? <h3 className="documentOutlineSlight" style={{ margin: 0 }}>{this.state.props.props.a.type.toUpperCase()}</h3> : ''}
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}