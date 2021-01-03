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
        this.setModalData = this.setModalData.bind(this);
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
            this.setState({ data: response.data(), players: [], classes: [], modalIsOpen: false, modalData: {} });

            console.log(response.data());
            
            // let arr = [...this.state.items];
            // this.state.data.items.forEach(async value => {
            //     await db.doc(value.path).get().then(e => {
            //         arr.push(e.data());   
            //     });

            //     this.setState({ items: arr });
            //     this.forceUpdate();
            // });

            let arr = [...this.state.players];
            
            db.collection(`${document_to_load}/players`).get().then(q => {
                q.forEach(a => arr.push( {a: a.data(), b: `${document_to_load}/players/${a.id}` }));

                this.setState({ players: arr });
                this.forceUpdate();
            })  

            let arr2 = [...this.state.classes];
            
            db.collection(`${document_to_load}/classes`).get().then(q => {
                q.forEach(a => arr2.push( {a: a.data(), b: `${document_to_load}/classes/${a.id}` }));

                this.setState({ classes: arr2 });
                this.forceUpdate();
            })  


        } catch (err) {
            return [];
        }
    }

    showClassesModal() {
        $("#content").css("overflow", "hidden");

        this.setState({ modalIsOpen: true });
        this.forceUpdate();

        // db.doc(doc_loc).collection(`classes`).where("name", "==", this.state.data.class)
        //     .get()
        //     .then(qs => {
        //         qs.forEach(e => {
        //             this.setState({ modalIsOpen: true });
        //             this.setState({ modalData: e.data() });
        //             this.forceUpdate();
        //         })
        //     });
    }

    setModalData(data) {
        this.setState({ modalData: data });
    }

    closeModal() {
        $("#content").css("overflow", "auto");
        this.setState({ modalIsOpen: false });
    }

    render() {        
        if(this.state.data) {
            return (
                <div className="item_page_dynamic relativePage">
                    <ClassModal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} data={this.state.modalData} type="view-only"/>
                    
                    <div className="header_content item_dynamic vertical">
                        <div className="vertical box marginLess gap15 item_dynamic heightFit" style={ { width: '100%' } }>
                            <h1>{this.state.data.name}</h1>
                            <p style={ { width: '100%' } }>{this.state.data.desc}</p>
                        </div>
                        
                        <div className="linear width100" style={ { width: '100%', height: '100%' } }>
                            <div className="vertical gapNormal paddingNormal width100" style={ { width: '100%' } }>
                                <div className="vertical half1" style={ {  height: '100%' } }>
                                    <div className="linear center space_between">
                                        <h2>Characters</h2>
                                        
                                        <a href="./list?v=characters">ALL {'>'}</a>
                                    </div>
                                    
                                    <List props={this.state.players} type="player"></List>
                                </div>

                                <div className="vertical half2" style={ {  height: '100%' } }>
                                    <div className="linear center space_between">
                                        <h2>Classes</h2>
                                    </div>
                                    
                                    <List props={this.state.classes} type="class" showModal={this.showClassesModal} setModalData={this.setModalData}></List>
                                </div>
                            </div>

                            <div className="vertical gapNormal paddingNormal" style={ { width: "100%" } }>
                                <div className="vertical half1">
                                    <div className="linear center space_between">
                                        <h2>Lore</h2>
                                        
                                        <a href="./create_lore">Create {'>'}</a>
                                    </div>
                                    
                                    <List props={[]} type="item"></List>
                                </div>
                            </div>
                        </div>
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
}

ReactDOM.render(<CampaignPage/>, document.getElementById('content'));