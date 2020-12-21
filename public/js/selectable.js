
class Selectable extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            props: props,
            active: props.active,
            parent: props.parent
        };

        this.handleClick = this.handleClick.bind(this);
        this.setFalse = this.setFalse.bind(this);
    }

    handleClick() {
        //this.setState({ active: !this.state.active });

        this.state.active = false;

        this.state.parent(this.state.props.props)
        this.forceUpdate()
    }

    setFalse() {
        this.setState({ active: false });
    }

    setTrue() {
        this.setState({ active: true });
    }

    render() {
        return (
            <a className={this.state.active ? `${this.state.props.className} activeButton`: `${this.state.props.className} innactiveButton`} onClick={this.handleClick}>{this.state.props.props.capitalize()}</a>
        );
    }
}

