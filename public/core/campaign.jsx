function getDocument(callback, document_to_load) {
    db.doc(document_to_load).get()
    .then(dc => {
        callback(dc.data());
        return dc.data();
    });
}

class CampaignPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.props = this.state.props.props;

        this.showClassesModal = this.showClassesModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        let document_to_load = localStorage.getItem("renderCampaign");

        if(localStorage.getItem("renderCampaign") == undefined) {
            window.href = window.origin;
        }

        console.log(document_to_load)

        this.getData(document_to_load);
    }

    async getData(document_to_load) {
        try {
            const response = await db.doc(document_to_load).get();
            this.setState({ data: response.data(), items: [], modalIsOpen: false, modalData: {} });

            console.log(response.data());
            // let arr = [...this.state.items];
            // this.state.data.items.forEach(async value => {
            //     await db.doc(value.path).get().then(e => {
            //         arr.push(e.data());   
            //     });

            //     this.setState({ items: arr });
            //     this.forceUpdate();
            // });
            
        } catch (err) {
            return [];
        }
    }

    showClassesModal() {
        $("#content").css("overflow", "hidden");

        let string_val = localStorage.getItem("renderCharacter");
        let doc_loc = string_val.slice(0, string_val.search("players"));
        console.log(`(${doc_loc}classes) where name == ${this.state.data.class}`);

        db.doc(doc_loc).collection(`classes`).where("name", "==", this.state.data.class)
            .get()
            .then(qs => {
                qs.forEach(e => {
                    this.setState({ modalIsOpen: true });
                    this.setState({ modalData: e.data() });
                    this.forceUpdate();
                })
            });
    }

    closeModal() {
        $("#content").css("overflow", "auto");
        this.setState({ modalIsOpen: false });
    }

    render() {        
        if(this.state.data) {
            return (
                <div className="item_page_dynamic relativePage">
                    {/* <ClassModal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} data={this.state.data} tree={this.state.modalData.tree}/> */}
                    
                    <div className="header_content item_dynamic">
                        <h1>{this.state.data.name}</h1>
                        <p>{this.state.data.desc}</p>
                    </div>
                </div>
            );   
        }else {
            return (
                <div>
                    <div className="center jcenter vertical" style={{ height: '100%' }}>
                        <div className="sk-cube-grid">
                            <div className="sk-cube sk-cube1"></div>
                            <div className="sk-cube sk-cube2"></div>
                            <div className="sk-cube sk-cube3"></div>
                            <div className="sk-cube sk-cube4"></div>
                            <div className="sk-cube sk-cube5"></div>
                            <div className="sk-cube sk-cube6"></div>
                            <div className="sk-cube sk-cube7"></div>
                            <div className="sk-cube sk-cube8"></div>
                            <div className="sk-cube sk-cube9"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
};

ReactDOM.render(<CampaignPage/>, document.getElementById('content'));