let quill;
let lastDebounce = new Date();

class LoreCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props: props, synced: false, docInformation: {title: 'Loading...', body: "LOADING REPORT", loading: true} };
    }

    loadLore() {
        let loc = localStorage.getItem("readLore");

        db.doc(loc).get().then(e => {
            this.setState({ docId: e.id, synced: true, docInformation: { ...e.data(), loading: false }});
            this.forceUpdate();
        })
    }

    render() {
        if(this.state.docInformation.loading) return (<></>);

        return (
            <div className="item_page_dynamic header_content">
                <div className="marginLess vertical center" style={{ margin: '5%' }}>
                    <h2>REQUESTING REPORT</h2>
                    <h1>{this.state.docInformation.title.toUpperCase()}</h1>
                    <p>Beginning Report...</p>
                </div>

                
                <div className="ql-container">
                    <h3>{this.state.docInformation.date.toDate().toDateString().toUpperCase()}</h3>
                    <div id="view" class="ql-editor" dangerouslySetInnerHTML={{ __html: this.state.docInformation.body }}></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.loadLore();
        });
    }
}

ReactDOM.render(<LoreCreate edit={false}/>, document.getElementById("content"))