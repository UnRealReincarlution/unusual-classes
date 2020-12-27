
class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
    }

    render() {
        if(this.state.props) {
            console.log(this);

            return (
                <div style={{ gap: '15px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {
                        this.props.props.map(el => {
                            if(this.props.type == 'campaign' || this.props.type == 'campaigns') {
                                return (
                                    <Campaign props={el} key={el.id} type="large" />
                                )
                            }else if(this.props.type == 'player' || this.props.type == 'characters'){
                                return (
                                    <Player props={el} key={el.b} type="small" />
                                )
                            }else if(this.props.type == "special_char") {
                                return (
                                    <Player props={{ a: el, b: "" }} key={el.b} type="small" />
                                )
                            }else {
                                return (
                                    <Item props={el} key={el.id} type="small"/>
                                )
                            }
                        })
                    }
                </div>
            );
        }else {
            return (
                <div className="centerdDiv">
                    <h2>{this.props.type == 'items' ? "There are no " : "You do not have any " } {this.props.type.capitalize()}, try creating one</h2>
                    <a href={`./create?v=${this.props.type}`}>+ Create {(this.props.type == 'items' ? 'an' : 'a')} {(this.props.type.capitalize().substring(0, this.props.type.length - 1))}</a>
                </div>
            )
        }  
    }
}

