
class CreateClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.children = [];
    }

    render() {
        return (
            <div className="item_page_dynamic">
                <div className="header_content item_dynamic vertical createClass" style={{ padding: '0px' }}>
                    <ClassModal isOpen={true} onRequestClose={this.closeModal} data={this.state.props.modalData} type="create"/>                 
                </div>
            </div>
        );
    }
}

