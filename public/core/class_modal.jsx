class ClassModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
    }

    render() {
        return (
            <div className={this.props.isOpen ? 'classModal' : 'classModal hidden'}>
                <h1>{this.props.data.class.capitalize()}</h1>
            </div>
        );
    }
};
